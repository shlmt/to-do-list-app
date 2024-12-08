using System;
using System.Collections.Generic;

namespace TodoMinimalApi;

public partial class Item
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool IsCompleted { get; set; }
}
