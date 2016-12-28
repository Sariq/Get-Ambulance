using getAmbulance.App_Start;
using getAmbulance.Client;
using getAmbulance.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
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

namespace getAmbulance.Controllers
{
    public class ClientAccountController : ApiController
    {
        private ApplicationIdentityContext _ctx;
        private ClientService _ClientService;
      

        public ClientAccountController()
        {
            _ctx = ApplicationIdentityContext.Create();
            _ClientService = new ClientService();
        }

        public ClientAccountController(ApplicationClientUserManager userManager)
        {
            UserManager = userManager;

        }

        private ApplicationClientUserManager _userManager;
        public ApplicationClientUserManager UserManager
        {

            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationClientUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        private App_Start.SignInHelper _helper;
        private App_Start.SignInHelper SignInHelper
        {
            get
            {
                if (_helper == null)
                {
                    _helper = new App_Start.SignInHelper(UserManager, AuthenticationManager);
                }
                return _helper;
            }
        }
        // POST: /ClientAccount/RegisterClient
        [HttpPost]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> RegisterClient(ClientRegisterModel model)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                var user = new ApplicationClientUser { UserName = model.Phone_Number,Id_Number=model.Id_Number, PhoneNumber = model.Phone_Number, Email = "null@null.com" };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await UserManager.AddClaimAsync(user.Id, new Claim("Full_Name", model.Full_Name));
                    var token = await UserManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");
                    var token2 = await UserManager.VerifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
                    await UserManager.NotifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
                    var result3 = await UserManager.ChangePhoneNumberAsync(user.Id, user.PhoneNumber, token);
                    response = Request.CreateResponse(HttpStatusCode.OK, ModelState);
                    return response;
                }
                AddErrors(result);
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            // If we got this far, something failed, redisplay form
            return (response);
        }

        // POST: /ClientAccount/CreateUserSendCodeByPhone
        [HttpPost]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> CreateUserSendCodeByPhone(CodeToClientModel model)
        {
            HttpResponseMessage response;
        
            if (ModelState.IsValid)
            {
                var clientUser = _ClientService.GetClientByUserName(model.Phone_Number);
                if (clientUser == null) {
                    var user = new ApplicationClientUser { UserName = model.Phone_Number, PhoneNumber = "+972" + model.Phone_Number, Email = "null@null.com" };
                    var result = await UserManager.CreateAsync(user);

                    if (result.Succeeded)
                    {
                        var token = await UserManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");
                        await UserManager.NotifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
                        response = Request.CreateResponse(HttpStatusCode.OK,"1");
                        return response;
                    }
                    AddErrors(result);
                }
                else
                {
                    var token = await UserManager.GenerateTwoFactorTokenAsync(clientUser.Id, "PhoneCode");
                    await UserManager.NotifyTwoFactorTokenAsync(clientUser.Id, "PhoneCode", token);
                    response = Request.CreateResponse(HttpStatusCode.OK,"2");
                    return response;
                }

            
            }
            response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            // If we got this far, something failed, redisplay form
            return (response);
        }
        //// POST: /ClientAccount/CreateUserSendCodeByPhone
        //[HttpPost]
        //[AllowAnonymous]
        //public async Task<HttpResponseMessage> UpdateClientUserData(ClientUserDataModel model)
        //{
        //    HttpResponseMessage response;
        //    if (ModelState.IsValid)
        //    {
        //        var user = new ApplicationClientUser { UserName = model.Phone_Number, PhoneNumber = "+972" + model.Phone_Number, Email = "null@null.com" };
        //        var result = await UserManager.CreateAsync(user);
        //        if (result.Succeeded)
        //        {

        //            var token = await UserManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");
        //            //   var token2 = await UserManager.VerifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
        //            await UserManager.NotifyTwoFactorTokenAsync(user.Id, "PhoneCode", token);
        //            // var result3 = await UserManager.ChangePhoneNumberAsync(user.Id, user.PhoneNumber, token);
        //            response = Request.CreateResponse(HttpStatusCode.OK, ModelState);
        //            return response;
        //        }
        //        AddErrors(result);
        //    }
        //    response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        //    // If we got this far, something failed, redisplay form
        //    return (response);
        //}

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
