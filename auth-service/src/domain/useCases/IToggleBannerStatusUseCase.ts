export interface IToggleBannerStatusUseCase {
    execute(id:string,status:boolean) : Promise<boolean>
}