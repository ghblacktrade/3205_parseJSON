import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Post()
    async searchUsers(@Body() body: { email: string; number?: string }) {
        const { email, number } = body
        const result = await this.searchService.search(email, number)

        return result
    }
}