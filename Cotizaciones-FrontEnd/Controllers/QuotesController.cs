using Cotizaciones_FrontEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Cotizaciones_FrontEnd.Controllers
{
    public class QuotesController : Controller
    {
        private readonly ILogger<QuotesController> _logger;

        public QuotesController(ILogger<QuotesController> logger)
        {
            _logger = logger;
        }

        public IActionResult IndexQuotes()
        {
            return View();
        }

        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}