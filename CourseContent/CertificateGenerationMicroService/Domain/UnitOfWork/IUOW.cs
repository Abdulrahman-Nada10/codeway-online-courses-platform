using CertificateGenerationMicroService.Domain.Entities;
using CertificateGenerationMicroService.Domain.Repository;



namespace CertificateGenerationMicroService.Domain.UnitOfWork
{
    public interface IUOW
    {
        IGenericRepository<TEntity, TKey> GetRepository<TEntity, TKey>() where TEntity : BaseEntity<TKey>;

        Task<int> SaveChangesAsync();
    }
}
