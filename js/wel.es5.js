'use strict';
var welBnerdata = {
  'm-welbner-0': "新鲜的草原纯正羔羊肉！肉质鲜美、肥而不腻，无膻味！ - 内蒙羊肉.	// 赤峰, 内蒙古",
  'm-welbner-1': "新疆特有地理产品！红枣又称为“黄金寿枣”，民间有“一日食仨枣，百岁不显老”之说！ // 阿克苏, 新疆",
  'm-welbner-2': "陕西洛川，人称“苹果之乡”！这里出产的苹果，素以色、香、味俱佳著称！-洛川苹果.	// 延安, 陕西",
  'm-welbner-3': "产自著名的“中国脐橙之乡”！品质优良, 风味独特，具有皮薄色鲜、肉脆汁多、香味浓郁、酸甜可口！ - 秭归脐橙.	// 宜昌, 湖北"
};
window.onload = function(ev) {
  init(function() {
    var welBner = document.getElementById('m-welbner'),
        welBnerInfo = document.getElementById('u-welinfo'),
        welBnerRelated = {
          el: welBnerInfo,
          data: welBnerdata
        };
    chgBner(welBner, 'm-welbner-', 4, welBnerRelated);
  });
};
