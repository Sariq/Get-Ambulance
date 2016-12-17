using AspNet.Identity.MongoDB;
using getAmbulance.Models;
using getAmbulance.WhiteLabel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static getAmbulance.Client.ClientModel;
using static getAmbulance.WhiteLabel.WhiteLabelModel;

namespace getAmbulance.Controllers
{
    [Authorize]
    public class AccountController : ApiController
    {
        private ApplicationIdentityContext _ctx;
        private WhiteLabelService _whiteLabelService;
        public AccountController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _whiteLabelService = new WhiteLabelService();
        }

        public AccountController(ApplicationUserManager userManager)
        {
            UserManager = userManager;

        }

        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {

            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        private SignInHelper _helper;
        private SignInHelper SignInHelper
        {
            get
            {
                if (_helper == null)
                {
                    _helper = new SignInHelper(UserManager, AuthenticationManager);
                }
                return _helper;
            }
        }


        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]

        public async Task<HttpResponseMessage> Register(RegisterViewModel model)
        {
            HttpResponseMessage response;
           
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email};
                var result = await UserManager.CreateAsync(user, model.Password);
            
                if (result.Succeeded)
                {
                    await UserManager.AddClaimAsync(user.Id, new Claim("WhiteLabelId", model.WhiteLabelId));

                    var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
//                    var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    var callbackUrl = Url.Link("DefaultApi", new { Controller = "Account", Action = "ConfirmEmail", userId = user.Id, code = code });

                    await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
                    // ViewBag.Link = callbackUrl;
                    response = Request.CreateResponse(HttpStatusCode.OK, ModelState);
                    return response;
                }
                    AddErrors(result);
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            // If we got this far, something failed, redisplay form
            return (response);
        }
        // POST: /Account/RegisterClient
        [HttpPost]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> RegisterClient(ClientRegisterModel model)
        {
            HttpResponseMessage response;

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
              
                var result = await UserManager.CreateAsync(user, model.Password);
                
                if (result.Succeeded)
                {

                    await UserManager.AddClaimAsync(user.Id, new Claim("Full_Name", model.Full_Name));
                     await UserManager.AddClaimAsync(user.Id, new Claim("Phone_Number", model.Age));
                     await UserManager.AddClaimAsync(user.Id, new Claim("Id_Number", model.Id_Number));
                    await UserManager.AddClaimAsync(user.Id, new Claim("Age", model.Age));
                    //var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    ////                    var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    //var callbackUrl = Url.Link("DefaultApi", new { Controller = "Account", Action = "ConfirmEmail", userId = user.Id, code = code });

                    //await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
                    // ViewBag.Link = callbackUrl;
                    response = Request.CreateResponse(HttpStatusCode.OK, ModelState);
                    return response;
                }
                AddErrors(result);
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            // If we got this far, something failed, redisplay form
            return (response);
        }

        //
        // GET: /Account/ConfirmEmail
        [HttpGet]
        [AllowAnonymous]
        public async void ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                //return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            if (result.Succeeded)
            {
               // return View("ConfirmEmail");
            }
          //  AddErrors(result);
          //  return View();
        }


        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

       
        #endregion
    }
}
