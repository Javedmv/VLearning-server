export interface IgetEarningsUseCase {
    execute(userId: string, role: string): Promise<any>;
}