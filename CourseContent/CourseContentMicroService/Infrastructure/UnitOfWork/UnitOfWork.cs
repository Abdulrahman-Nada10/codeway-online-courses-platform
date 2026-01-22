using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;
using CourseContentMicroService.Infrastructure.Contexts;
using CourseContentMicroService.Infrastructure.Repositories;
namespace CourseMangment.MicroService.Infrastructure.UnitOfWork
{
    public class UnitOfWork(ApplicationDbContext context):IUOW
    {
        private Dictionary<string, object> repositories = [];
        public IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>
        {
            var TypeName = typeof(TEntity).Name;//esm el repo

            if (repositories.ContainsKey(TypeName))//3shan lw el repo da atalb w mwgood abl kda
            {
                return (IGenericRepository<TEntity, TKey>)repositories[TypeName];//u must cast l Repo 3shan ynf3 tb3to 
            }
            else
            {
                var repo = new GenericRepository<TEntity, TKey>(context); //lw mafish e3mlo craete w 5zn 3shan lw geh tany fe nfs el rquest yst5dmha
                repositories.Add(TypeName, repo);
                return repo;//m7tag trg3o b2a 
            }
        }
        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
