using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripService.Enumerators;
using TripService.Models.Domain;
using TripService.Resources;

namespace TripService.Extensions
{
    public class AtlasSearchExtensions
    {
        public static BsonDocument GetMatchingLocationsQuery(string[] keywords)
        {
            return new BsonDocument(AtlasStringResources.SearchStage,
            new BsonDocument
               {        {AtlasStringResources.Index, AtlasStringResources.IndexName},
                        { AtlasStringResources.Compound,
                new BsonDocument
                {
                    {AtlasStringResources.Should,  SetSearchCriterias(keywords)}
                }
                },
               });
        }

        public static BsonDocument GetDatesRestrictionQuery(DateTime startDate, DateTime endDate)
        {
            return new BsonDocument
            {
                {AtlasStringResources.MatchStage,
                    new BsonDocument
                    {
                        {AtlasStringResources.StartDate, new BsonDocument{
                                {AtlasStringResources.Gte, startDate }
                            }
                        },
                        {AtlasStringResources.EndDate, new BsonDocument{
                                {AtlasStringResources.Lte, endDate}
                            }
                        }
                    }
                }
            };

            //return BsonDocument.Parse($"{{\"$match\": {{\"StartDate\": {{\"$gte\": ISODate('{startDate.ToUniversalTime()}')}}, \"EndDate\": {{\"$lte\": ISODate('{endDate.ToUniversalTime()}')}}}}");
        }

        public static BsonDocument GetEmptyStage()
        {
            return new BsonDocument
            {
                {AtlasStringResources.MatchStage,
                    new BsonDocument
                    {

                    }
                }
            };
        }

        public static BsonArray SetSearchCriterias(string[] keywords)
        {
            BsonArray criterias = new BsonArray();
            foreach (string key in keywords)
            {
                BsonDocument criteria = new BsonDocument
                {
                    {AtlasStringResources.Text, new BsonDocument
                        {
                            {AtlasStringResources.Query, key },
                            {AtlasStringResources.Path, "FullAddress" }
                        }
                    }
                };
                criterias.Add(criteria);
            }
            return criterias;
        }

        public static BsonDocument GetPrivacyRestriction()
        {
            return new BsonDocument
            {
                {AtlasStringResources.MatchStage,
                    new BsonDocument
                    {
                        {
                            "Privacy",
                            new BsonDocument
                            {
                                {
                                    AtlasStringResources.NotEquals,
                                    TripPrivacy.Private
                                }
                            }
                        },
                        {
                            "State",
                            new BsonDocument
                            {
                                {
                                   AtlasStringResources.Equals,
                                   TripState.Planning
                                }

                            }
                        }
                    }
                }
            };
        }

        public static BsonDocument GetFriendsOnlyRestriction(List<Guid> friendsIds)
        {

            return new BsonDocument
            {
                {AtlasStringResources.MatchStage,
                    new BsonDocument
                    {
                        {
                            "OrganizerId",
                            new BsonDocument
                            {
                                {
                                    AtlasStringResources.In,
                                    new BsonArray(friendsIds)
                                }
                            }
                        }
                    }
                }
            };
        }

        public static BsonDocument GetOwnTripsRestriction(Guid organizerId)
        {
            return new BsonDocument
            {
                {AtlasStringResources.MatchStage,
                    new BsonDocument
                    {
                        {
                            "OrganizerId",
                            new BsonDocument
                            {
                                {
                                    AtlasStringResources.NotEquals,
                                    organizerId
                                }
                            }
                        }
                    }
                }
            };
        }

        public static BsonDocument GetCountStage()
        {
            return new BsonDocument
            {
                {
                    AtlasStringResources.Count,"tripsNo"
                }
            };
        }
    }
}
