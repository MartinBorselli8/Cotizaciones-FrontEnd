using Cotizaciones_FrontEnd.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cotizaciones_FrontEnd.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(Models.User _user)
        {
            DA_Logic _da_User = new DA_Logic();

            var User = _da_User.ValidateUser(_user.UserName, _user.Password);

            if (User != null)
            {
                #region AUTENTICACTION
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, User.UserName),
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                #endregion
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return View();
            }


        }
        public async Task<IActionResult> Exit()
        {
            #region AUTENTICACTION
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            #endregion

            return RedirectToAction("Index");
        }

        public IActionResult NewUser()
        {
            return View();
        }
    }
}
