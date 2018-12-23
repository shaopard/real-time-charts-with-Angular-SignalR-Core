using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealTimeCharts_Server.DataStorage;
using RealTimeCharts_Server.HubConfig;
using RealTimeCharts_Server.TimerFeatures;
using System;

namespace RealTimeCharts_Server.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class ChartController : Controller
    {
        private IHubContext<ChartHub> _hub;

        public ChartController(IHubContext<ChartHub> hub)
        {
            _hub = hub;
        }

        [EnableCors("CorsPolicy")]
        public IActionResult Get()
        {
            Action lala = () => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData());

            var timerManager = new TimerManager(lala);

            return Ok(new { Message = "Request Completed" });
        }
    }
}