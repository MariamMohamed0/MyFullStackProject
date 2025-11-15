using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _context.Students.Include(s => s.Department).ToListAsync();
            return Ok(students);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var student = await _context.Students
                .Include(s => s.Department)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
                return NotFound($"Student with id {id} not found.");

            return Ok(student);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return Ok(student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Student student)
        {
            var existingStudent = await _context.Students.FindAsync(id);
            if (existingStudent == null)
                return NotFound($"Student with id {id} not found.");

            existingStudent.Name = student.Name;
            existingStudent.Age = student.Age;
            existingStudent.DepartmentId = student.DepartmentId;

            await _context.SaveChangesAsync();

            return Ok(existingStudent);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound($"Student with id {id} not found.");

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok($"Student with id {id} deleted successfully.");
        }
    }
}
