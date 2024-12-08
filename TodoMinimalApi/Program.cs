using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoMinimalApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("localDB"),
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.40-mysql")
    ));

builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen(); 

var app = builder.Build();
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/item", async (ToDoDbContext dbContext) =>  {
    var items = await dbContext.Items.ToListAsync();
    if (items == null) 
        return Results.NotFound("No items found.");
    return Results.Ok(items);
});

app.MapPost("/item", async (ToDoDbContext dbContext, Item item) => {
    if (item == null) return Results.BadRequest("Item cannot be null.");
    if (item.Name == null) return Results.BadRequest("fields cannot be null.");
    if(!item.IsCompleted) item.IsCompleted = false;
    await dbContext.Items.AddAsync(item);
    await dbContext.SaveChangesAsync();
    var createdItem = await dbContext.Items.FindAsync(item.Id);
    if (createdItem == null) return Results.Problem("Failed to retrieve the created item.");
    return Results.Created($"/item/{createdItem.Id}", createdItem);
});

app.MapPut("/item/{id}", async (ToDoDbContext dbContext, int id, [FromQuery] bool isComplete) => {
    var item = await dbContext.Items.FindAsync(id);
    if (item == null) return Results.NotFound($"Item with ID {id} not found.");
    item.IsCompleted = isComplete;
    await dbContext.SaveChangesAsync();
    return Results.Ok(item);
});

app.MapDelete("/item/{id}", async (ToDoDbContext dbContext, int id) => {
    var item = await dbContext.Items.FindAsync(id);
    if (item == null) return Results.NotFound();
    dbContext.Items.Remove(item);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();