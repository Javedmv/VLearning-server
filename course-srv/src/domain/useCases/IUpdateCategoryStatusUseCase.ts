export interface IUpdateCategoryStatusUseCase {
    execute(catId:string,status:Boolean): Promise<Boolean| null>
}