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
using System.Device.Location;
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
                try
                {
                    var user = new ApplicationUser { UserName = model.Email, Email = model.Email, WhiteLabelId = model.WhiteLabelId, IsInvoiceByMail = model.IsInvoiceByMail, IsServicesOffer = model.IsServicesOffer };
                    var result = await UserManager.CreateAsync(user, model.Password);

                    if (result.Succeeded)
                    {
                       
                        var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                        // var result2 =  UserManager.ConfirmEmailAsync(user.Id, code);
                        var EncodeUserId = HttpUtility.UrlEncode(user.Id);
                        var EncodeCode = HttpUtility.UrlEncode(code);
                        await UserManager.SendEmailAsync(user.Id, "אישור חשבון", "בבקשה תאשר את החשבון שלך באמצעות לחיצה על אשר חשבון: <a href=\"https://qaprovider.getambulance.com/app/index.html#/confirm-email?userId=" + EncodeUserId + "&code="+ EncodeCode + "\">אשר חשבון</a>");
                        response = Request.CreateResponse(HttpStatusCode.OK, ModelState);
                        return response;
                    }
                    AddErrors(result);
                }
                 catch(Exception ex)
                {

                }

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
                var user = new ApplicationUser { UserName = model.Id_Number, PhoneNumber=model.Phone_Number,Email="null@null.com" };
   
                var result = await UserManager.CreateAsync(user);
                
                if (result.Succeeded)
                {

                    await UserManager.AddClaimAsync(user.Id, new Claim("Full_Name", model.Full_Name));
                //    await UserManager.AddClaimAsync(user.Id, new Claim("Age", model.Age));

                    var token = await UserManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");
                    // See IdentityConfig.cs to plug in Email/SMS services to actually send the code
                    var token2 = await UserManager.VerifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
                    await UserManager.NotifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
                    var result3 = await UserManager.ChangePhoneNumberAsync(user.Id, user.PhoneNumber, token);

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
        // Post: /Account/ConfirmEmail
        [HttpPost]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> ConfirmEmail(ConfirmEmailModel model)
        {
            HttpResponseMessage response;

            if (model.userId == null || model.code == null)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, model);
                return response;
            }
            var result = await UserManager.ConfirmEmailAsync(model.userId, model.code);
            if (result.Succeeded)
            {
                response = Request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            }
            response = Request.CreateResponse(HttpStatusCode.BadRequest, model);
            return response;


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
        
        [AllowAnonymous]
        public async Task<HttpResponseMessage> ResetPassword(ResetPasswordModel model)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.userId);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    response = Request.CreateResponse(HttpStatusCode.OK);
                    return response;
                    //return View("ForgotPasswordConfirmation");
                }
                UserManager.RemovePassword(user.Id);
                UserManager.AddPassword(user.Id, model.Password);
                response = Request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            // If we got this far, something failed, redisplay form
            return response;
        }

        [AllowAnonymous]
        public async Task<HttpResponseMessage> WhiteLabelForgotPassword(WhiteLabelForgotPasswordViewModel model)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    response = Request.CreateResponse(HttpStatusCode.OK);
                    return response;
                    //return View("ForgotPasswordConfirmation");
                }

              
                var code = await UserManager.GenerateTwoFactorTokenAsync(user.Id, "EmailCode");
                // See IdentityConfig.cs to plug in Email/SMS services to actually send the code
              //  var token2 = await UserManager.VerifyTwoFactorTokenAsync(user.Id, "EmailCode", code);
                //await UserManager.NotifyTwoFactorTokenAsync(user.Id, "EmailCode", code);
                await UserManager.SendEmailAsync(user.Id, "איפוס סיסמא", "קישור לאיפוס סיסמא: <a href=\"http://localhost:57867/app/index.html#/reset-password?userId=" + model.Email + "&code=" + code + "\">אפס סיסמא</a>");

                response = Request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            // If we got this far, something failed, redisplay form
            return response;
        }

        [AllowAnonymous]
        public async Task<HttpResponseMessage> WhiteLabelCodeChangePassword(WhiteLabelForgotPasswordViewModel model)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    response = Request.CreateResponse(HttpStatusCode.OK);
                    return response;
                    //return View("ForgotPasswordConfirmation");
                }

                var token = await UserManager.GenerateTwoFactorTokenAsync(user.Id, "EmailCode");
                // See IdentityConfig.cs to plug in Email/SMS services to actually send the code
                var token2 = await UserManager.VerifyTwoFactorTokenAsync(user.Id, "EmailCode", token);
                await UserManager.NotifyTwoFactorTokenAsync(user.Id, "EmailCode", token);

                response = Request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            // If we got this far, something failed, redisplay form
            return response;
        }
        [AllowAnonymous]
        public async Task<HttpResponseMessage> ForgotPassword(ForgotPasswordViewModel model)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    response = Request.CreateResponse(HttpStatusCode.OK);
                    return response;
                    //return View("ForgotPasswordConfirmation");
                }




               var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
              var callbackUrl = Url.Link("DefaultApi", new { Controller = "Account", Action = "ResetPassword", userId = user.Id, code = code });

                //  await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");

                //var token = await UserManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");
                //// See IdentityConfig.cs to plug in Email/SMS services to actually send the code
                //var token2=await UserManager.VerifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
                //await UserManager.NotifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);

               
                ////var callbackUrl = Url.Action("ResetPassword", "Account",
                ////new { UserId = user.Id, code = code }, protocol: Request.Url.Scheme);
               await UserManager.SendEmailAsync(user.Id, "Reset Password",
              "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>");
                ////  return View("ForgotPasswordConfirmation");

                //await UserManager.SetPhoneNumberAsync(user.Id, "+9720528602121");
                //await UserManager.SendSmsAsync(user.Id, " GET AMBULANCE");

                response = Request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            // If we got this far, something failed, redisplay form
            return response;
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
