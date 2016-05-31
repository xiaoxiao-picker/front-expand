define(function(require, exports, module) {
    var Helper = require("helper");
    var globalResponseHandler = require('ajaxhandler');

    var orgIdsByProvince = {
        shanghai: {
            ids: ['d96afc89-838e-4e09-927e-de2d9a084472', '3825ff02-22ab-4ec2-b2fd-2959b4825c53', '98a0da11-8091-4707-b88a-a407f88f78aa', 'dcdd2109-11d6-49fd-8568-cdcf85d14aad']
        },
        hunan: {
            ids: ['0fc0f3d7-3790-4a8a-a0a5-3a911ea1fe6d']
        },
        beijing: {
            ids: ['4559e970-784e-48a2-b7e7-33f3537bea6e']
        },
        yunnan: {
            ids: ['374e495c-bffd-47a0-94bc-cce79726a562']
        },
        hubei: {
            ids: ['61e1643b-8769-4fbb-9977-704b202cf2ee']
        },
        guangdong: {
            ids: ['370bc6ec-6102-4b05-902c-bc7e05560a59']
        },
        jiangsu: {
            ids: ['cf2daba4-09cb-4acf-959f-47840c57f31e']
        },
        tianjin: {
            ids: ['9e67f003-d578-4af9-970e-6ba9e203c903']
        },
        jilin: {
            ids: ['0e55e9db-1218-4a14-97d6-535da0dbb48c']
        },
        heilongjiang: {
            ids: ['e4b1cc17-37c0-4e67-9b33-47a7224bc310']
        },
        liaoning: {
            ids: ['6edca304-dfe6-4bfd-903e-23090ed091c3']
        },
        shanxi: {
            ids: ['f7e32408-052c-45e1-83f0-22764dedad1d']
        },
        shandong: {
            ids: ['92b833a9-a0aa-444e-a3d0-410de25e38b8']
        },
        guangxi: {
            ids: ['d2f2774c-e550-48df-a496-a54483e0acb1']
        },
        hebei: {
            ids: ['a3be343a-cfe7-48f2-afca-1328be93293a']
        },
        zhejiang: {
            ids: ['0339ee29-7503-4bb5-9773-d4f8d5607355']
        },
        shaanxi: {
            ids: ['81a15f6a-9e76-49c3-8382-919fa2430999']
        }
    };

    var shareId = 3;
    var session, appId, wx_config;
    var debug = Helper.param.search("debug");

    function getSession() {
        return globalResponseHandler({
            url: 'session/create'
        }, {
            description: "创建会话"
        });
    }

    function getPublicAppId() {
        return globalResponseHandler({
            url: 'application/public-app-id'
        }, {
            description: "获取微信唯一标识"
        });
    }

    function getJSSDKSignature(url) {
        return globalResponseHandler({
            url: 'application/js-api-signature',
            data: {
                url: url
            }
        }, {
            description: "获取微信签名"
        });
    }

    function getLogs(data) {
        return globalResponseHandler({
            url: 'organization/heat/list-heats',
            data: data
        }, {
            description: "获取组织热度列表"
        });
    }

    function WXConfig() {
        wx.config({
            debug: debug ? true : false,
            appId: appId,
            timestamp: wx_config.timestamp,
            nonceStr: wx_config.nonceStr,
            signature: wx_config.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem'
            ]
        });

        wx.ready(function() {
            wx.checkJsApi({
                jsApiList: [
                    'getNetworkType'
                ],
                success: function(res) {
                    WXListener();
                }
            });
        });

        function WXListener() {
            var share = {
                title: '圣诞来比拼',
                desc: '这个寒假校校免费送你回家',
                link: window.location.origin + "/posters/christmas/index.html",
                imgUrl: ''
            };
            wx.onMenuShareTimeline(share);
            wx.onMenuShareAppMessage(share);
            wx.onMenuShareQQ(share);
            wx.onMenuShareWeibo(share);
        }

        window.WXListener = WXListener;
    }

    function makeMapData(logs) {
        var currentLogs = logs.concat([]);
        var mapWidth = $('body').width() * 0.9;
        var mapHeight = mapWidth * 4 / 5;

        // 按省份转换数据结构
        var stateData = {};
        $.each(orgIdsByProvince, function(key, value) {
            stateData[key] = {};

            var provinceTotal = 0;
            stateData[key]['organizations'] = [];
            $.each(value.ids, function(idx, organizationId) {
                $.each(currentLogs, function(o_idx, log) {
                    if (organizationId == log.organization.id) {
                        stateData[key]['organizations'].push(log);
                        provinceTotal += log.total;
                        currentLogs.splice(o_idx, 1);
                        return false;
                    };
                });
            });
            stateData[key]['total'] = provinceTotal;
        });

        // 确定最大数值
        var maxTotal = 100;
        $.each(stateData, function(key, value) {
            maxTotal = maxTotal < value.total ? value.total : maxTotal;
        });

        // 地图省份根据热度区分颜色
        $.each(stateData, function(key, value) {
            var total = value.total;
            var multiple = maxTotal / total;
            if (multiple >= 1 && multiple < 2) {
                stateData[key]['stateInitColor'] = 0;
            } else if (multiple >= 2 && multiple < 3) {
                stateData[key]['stateInitColor'] = 1;
            } else if (multiple >= 3 && multiple < 4) {
                stateData[key]['stateInitColor'] = 2;
            } else if (multiple >= 4 && multiple < 5) {
                stateData[key]['stateInitColor'] = 3;
            } else if (multiple >= 5) {
                stateData[key]['stateInitColor'] = 4;
            }
        });

        // 处理不存在投票的省份
        $.each(chinaMapConfig.names, function(key, value) {
            stateData[key] = stateData[key] ? stateData[key] : {
                stateInitColor: 5
            }
        });

        $('#ChinaMap').SVGMap({
            mapName: 'china',
            showTip: false,
            mapWidth: mapWidth,
            mapHeight: mapHeight,
            stateData: stateData,
            clickCallback: function(stateData, obj) {}
        });
    }

    $(document).ready(function() {
        var organizationIds = [];
        // 数据请求
        getSession().done(function(data) {
            session = data.result;
            var url = encodeURIComponent(window.location.origin + window.location.pathname + window.location.search);
            var startDate = new Date('2015/12/10 00:00').getTime();
            var endDate = new Date('2016/12/27 00:00').getTime();

            $.each(orgIdsByProvince, function(key, value) {
                organizationIds = organizationIds.concat(value.ids);
            });

            var options = {
                organizationIds: organizationIds.join(','),
                businessModule: 'VOTE',
                startDate: startDate,
                endDate: endDate,
                skip: 0,
                limit: organizationIds.length
            };
            getLogs(options).done(function(data) {
                var logs = data.result;

                var html = "";
                $.each(logs, function(idx, log) {
                    var row_html = ['<li>',
                        '<a class="clearfix" href="' + window.location.origin + '/index.html#organization/' + log.organization.id + '/votes?type=UGC">',
                        '<img src="' + log.organization.logoUrl + '@40w_40h_1e_1c" />',
                        '<div class="content">',
                        '<h5>TOP.' + (idx + 1) + '</h5>',
                        '<h4>' + log.organization.name + '</h4>',
                        '</div>',
                        '<span class="total"><i class="iconfont icon-flame"></i> ' + (log.total + 10232) + '</span>',
                        '</a>',
                        '</li>'
                    ].join('');
                    html += row_html;
                });
                $(html).appendTo('body .options-box');

                makeMapData(logs);

                $('.christmas-body').on("click", ".link-rule", function() {
                    $("#ModalContainer").addClass('show');
                });

                $('.christmas-body').on("click", ".btn-close", function() {
                    $("#ModalContainer").removeClass('show');
                });
            }).fail(function(error) {
                Helper.alert(error);
            });

            // 微信分享
            $.when(getPublicAppId(), getJSSDKSignature(url)).done(function(data1, data2) {
                appId = data1.result;
                wx_config = data2.result;
                WXConfig();
            }).fail(function(error) {
                Helper.alert(error);
            });
        }).fail(function(error) {
            Helper.alert(error);
        });
    });
});
