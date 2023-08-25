using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using WebApi.Models;

namespace WebApi.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public IConfiguration _configuration { get; private set; }
        public Connections con { get; private set; }
        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
            con = new Connections(_configuration["ConnectionStrings:Defaultconnection"].ToString());
        }
        [HttpGet]
        public IEnumerable<employees> GetEmployees()
        { 
         var emp = con.GetEmployees();
            return emp;
        }
        [HttpPost]
        public IActionResult Create([FromBody] employees emp)
        {
            if (emp == null)
            {
                return BadRequest("Invalid data");
            }
            var newitem = con.Add(emp);
            emp.EmployeeID = newitem;

            return Ok(emp);
        }

        [HttpDelete("{employeeID}")]
        public IActionResult Delete(int employeeID)
        {
            if (employeeID <= 0)
            {
                return BadRequest("Invalid employee ID");
            }            

            if (employeeID == null)
            {
                return NotFound("Employee not found");
            }

              con.Delete(employeeID);
            var msgs = new { message =  "Deleted Successfully" };   

            return Ok( msgs ); 
        }
        [HttpPut("update/{data}")]
        public IActionResult Update([FromBody] employees data)
        {
              bool check = con.Update(data);
            if (check)
            {
                var message = new { message = "Done Updated" };
                return Ok(message);
            }
            else
            return BadRequest();
        }
    }
}
