﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace TripService.Enumerators
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum RoleEnum
    {
        User,
        Administrator
    }
}
