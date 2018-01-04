using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace STS.Utils
{
    public static class LinqExtensions
    {
        public static IEnumerable<T> OrderBy<T>(this IEnumerable<T> entities, string propertyName,
            string direction = "desc")
        {
            var orderBy = entities as IList<T> ?? entities.ToList();
            if (!orderBy.Any() || string.IsNullOrEmpty(propertyName))
                return orderBy;

            var propertyInfo = orderBy.First().GetType().GetProperty(propertyName,
                BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            return direction == "asc"
                ? orderBy.OrderBy(e => propertyInfo.GetValue(e, null))
                : orderBy.OrderByDescending(e => propertyInfo.GetValue(e, null));
        }
    }
}