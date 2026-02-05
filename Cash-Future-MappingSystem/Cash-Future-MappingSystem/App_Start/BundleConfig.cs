using System.Web;
using System.Web.Optimization;

namespace Cash_Future_MappingSystem
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery.min.js",
                         "~/Scripts/jquery-ui.min.js",
                         "~/Scripts/jquery.dataTables.min.js"
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(


                      ));

            bundles.Add(new ScriptBundle("~/bundles/custom").Include(
                      "~/Assets/clientmaster.js",
                      "~/Assets/clientupload.js",
                      "~/Assets/SecurityUplode.js",
                      "~/Assets/ConfirmationBroker.js",
                         "~/Assets/BrokerUplode.js",
                         "~/Assets/TickerMapping.js",
                         "~/Assets/PageAccessLogs.js",
                         "~/Assets/RoleMaster.js",
                         "~/Assets/RoleMenuMapping.js",
                         "~/Assets/UserMasterData.js",
                         "~/Assets/DailyMatchedSummryReport.js",
                         "~/Assets/BrokerwiseMatReport.js",
                         "~/Assets/UnmatchedTradesReport.js",
                         "~/Assets/TradewiseMatchingReport.js",
                         "~/Assets/FileMaster.js",
                         "~/Assets/Settings.js",
                         "~/Assets/OpeningHoldings.js",
                         "~/Assets/OpeningHoldingsUplode.js",
                          "~/Assets/user.js",
                          "~/Assets/role.js",
                          "~/Assets/roleMenuMapping.js",
                          "~/Assets/report.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
               "~/Content/bootstrap.min.css",
              "~/Content/toaster.css"
                      ));
        }
    }
}
