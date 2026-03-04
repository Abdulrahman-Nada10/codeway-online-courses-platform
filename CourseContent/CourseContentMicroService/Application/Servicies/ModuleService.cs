using AutoMapper;
using CourseContentMicroService.Application.DTO_s.Module_DTO_s;
using CourseContentMicroService.Application.Interfaces;
using CourseContentMicroService.Domain.Entities;
using CourseContentMicroService.Domain.Repository;
using CourseContentMicroService.Domain.UnitOfWork;

namespace CourseContentMicroService.Application.Servicies
{
    public class ModuleService(IUOW _unitOfWork, IMapper _mapper, IModuleRepository repo) : IModuleService
    {

        public async Task<IEnumerable<ModuleDto>> GetAllAsync()
        {
          
            var modules = await repo.GetAllAsync();
            var mappedModules = _mapper.Map<IEnumerable<ModuleDto>>(modules);

            return mappedModules == null? null: mappedModules;

        }

        public async Task<ModuleDto?> GetByIdAsync(int id)
        {
            
            var module = await repo.GetByIdAsync(id);
            var mappedModule = _mapper.Map<ModuleDto>(module);

            return mappedModule == null ? null : mappedModule;
        }

        public async Task<ModuleDto> CreateAsync(CreateModuleDto dto)
        {
           

            var module = _mapper.Map<Module>(dto);

            await repo.CreateAsync(module);

            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ModuleDto>(module);
        }


        public async Task<ModuleDto?> UpdateAsync(int id, UpdateModuleDto dto)
        {
            

            var module = await repo.GetByIdAsync(id);

            if (module == null) return null;


            module.Title = dto.Title;
            module.Order = dto.Order;
            module.UpdatedAt = DateTime.UtcNow;


            repo.update(module);

            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ModuleDto>(module);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            
            var module = await repo.GetByIdAsync(id);
            if (module == null)
                return false;

            repo.delete(module);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        //custom servicies 

        public async Task<IEnumerable<ModuleDto>> GetModulesByCourseAsync(Guid courseId)
        {
            var filteredModules = await repo.GetModulesByCourseIdAsync(courseId);
            return filteredModules ==null ? null :  _mapper.Map<IEnumerable<ModuleDto>>(filteredModules);
        }

        public async Task<IEnumerable<ModuleWithLessonsDto>> GetModulesWithLessonsByCourseAsync(Guid courseId)
        {
            var modules = await repo.GetModulesWithLessonsByCourseIdAsync(courseId);

            return modules==null? null : _mapper.Map<IEnumerable<ModuleWithLessonsDto>>(modules);

        }

        public async Task<ModuleWithLessonsDto?> GetModuleWithLessonsAsync(int moduleId)
        {
            var modules = await repo.GetModuleWithLessonsAsync(moduleId);

            return modules == null ? null : _mapper.Map<ModuleWithLessonsDto>(modules);
        }

        public async Task<bool> ReorderModulesAsync(Guid courseId, Dictionary<int, int> moduleOrderMap)
        {
            var modules = await repo.GetModulesByCourseIdAsync(courseId);

            foreach (var module in modules)
            {
                if (moduleOrderMap.ContainsKey(module.Id))
                {
                    module.Order = moduleOrderMap[module.Id];
                    module.UpdatedAt = DateTime.UtcNow;
                    repo.update(module);
                }
            }

            await _unitOfWork.SaveChangesAsync();
            return true;
        }


    }
}
