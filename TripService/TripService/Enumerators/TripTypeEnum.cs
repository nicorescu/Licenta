using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;


namespace TripService.Enumerators
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum TripTypeEnum
    {
        [EnumMember(Value = "Private")]
        Private,
        [EnumMember(Value = "Friends Only")]
        FriendsOnly,
        [EnumMember(Value = "Public")]
        Public
    }
}
