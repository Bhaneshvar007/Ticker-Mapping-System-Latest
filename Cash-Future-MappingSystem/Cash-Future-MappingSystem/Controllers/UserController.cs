using Cash_Future_MappingSystem.BAL;
using CRMITStaffing.CustomHelper;
using Cylsys.Common;

using System.Web.Mvc;

namespace Cash_Future_MappingSystem.Controllers
{
    [CustomAuthorize]
    public class UserController : Controller
    {
        // GET: User
        [CustomAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetUser()
        {
            UserMaster userMaster = new UserMaster();
            return new JsonNetResult(userMaster.GetUserData());

        }

        public ActionResult AddUser()
        {
            Role role = new Role();

            var res = role.GetRoleData();
            ViewBag.roleData = res;
            return View();
        }
        [HttpPost]

        public JsonResult SaveUser(UserModel userModel)
        {
            if (userModel == null)
            {
                return Json(new { success = false, message = "Invalid user data received." });
            }

            UserMaster userMaster = new UserMaster();
            var result = userMaster.AddUserData(userModel);
            if (result == "Success")
            {
                return Json(new { success = true, message = "User created successfully!" });
            }

            return Json(new { success = true, message = "Error While creating user" });

        }

        public ActionResult GetUserGrid()
        {
            return View();
        }



        [Route("/User/UpdateUser/{id}")]
        public ActionResult UpdateUser(int? id)
        {

            Role role = new Role();
            var res = role.GetRoleData();
            ViewBag.roleData = res;


            UserMaster userMaster = new UserMaster();
            var user = userMaster.GetUserById(id);
            ViewBag.UserData = Newtonsoft.Json.JsonConvert.SerializeObject(user);

            return View();
        }

        public ActionResult UpdateUserSave(UserModel model)
        {
            if (model == null)
            {
                return Json(new { success = false, message = "Invalid user data received." });
            }
            UserMaster userMaster = new UserMaster();
            var result = userMaster.AddUserData(model);
            if (result == "Success")
            {
                return Json(new { success = true, message = "User Updated successfully!" });
            }

            return Json(new { success = true, message = "Error While Update" });
        }




    }
}