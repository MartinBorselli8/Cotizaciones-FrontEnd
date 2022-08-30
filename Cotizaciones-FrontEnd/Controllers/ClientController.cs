using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cotizaciones_FrontEnd.Controllers
{
    [Authorize]
    public class ClientController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult NewClient()
        {
            return View();
        }
        public IActionResult EditClient(int id)
        {
            ViewBag.Id = id;
            return View();
        }

    }
}
