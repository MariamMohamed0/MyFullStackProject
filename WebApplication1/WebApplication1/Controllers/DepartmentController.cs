using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class DepartmentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Departments.Include(d => d.Students).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var dept = _context.Departments
                .Include(d => d.Students)
                .FirstOrDefault(d => d.Id == id);

            if (dept == null)
                return NotFound($"Department with id {id} not found.");

            return Ok(dept);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Department dept)
        {
            _context.Departments.Add(dept);
            await _context.SaveChangesAsync();
            return Ok(dept);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Department dept)
        {
            var existingDept = await _context.Departments.FindAsync(id);
            if (existingDept == null)
                return NotFound($"Department with id {id} not found.");

            existingDept.Name = dept.Name;
            await _context.SaveChangesAsync();

            return Ok(existingDept);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var dept = await _context.Departments.FindAsync(id);
            if (dept == null)
                return NotFound($"Department with id {id} not found.");

            _context.Departments.Remove(dept);
            await _context.SaveChangesAsync();

            return Ok($"Department with id {id} deleted successfully.");
        }
    }
}
