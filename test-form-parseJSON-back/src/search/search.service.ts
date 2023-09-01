import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import * as path
    from "path";

@Injectable()
export class SearchService {
    private searchData: any[] = []

    constructor() {
        this.loadDataFromFile()
    }

    private async loadDataFromFile() {

        try {
            const readFile = promisify(fs.readFile)
            const data = await readFile(path.resolve(__dirname, 'search', 'data.json'), 'utf8')
            this.searchData = JSON.parse(data)
        } catch (error) {
            console.error('Error loading data:', error);
            throw new Error('Fail load data')
        }
    }

    async search(email: string, number?: string): Promise<any[]> {
        const filteredData = this.searchData.filter((item) => {
            return (
                item.email === email &&
                (!number || item.number.includes(number.replace(/-/g, '')))
            )
        })

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(filteredData)
            }, 5000)
        })
    }
}