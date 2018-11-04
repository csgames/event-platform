import { Injectable } from '@nestjs/common';
import { Response } from 'node-fetch';
import { STSService } from '@polyhx/nest-services';

let nodeFetch = require('node-fetch');

@Injectable()
export class LHGamesService {

    private lhGamesApiUrl = process.env.LH_GAMES_API_URL;

    constructor(private stsService: STSService) {
    }

    async createTeam(teamId: string) {
        try {
            const res: Response = await nodeFetch(`${this.lhGamesApiUrl}/team`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await this.stsService.getCurrentAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teamId
                })
            });
            console.log(res);
        } catch (e) {
            throw new Error('Failed to create a team on LH Games API.');
        }
    }

    async deleteTeam(teamId: string) {
        try {
            const res = await nodeFetch(`${this.lhGamesApiUrl}/team/${teamId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${await this.stsService.getCurrentAccessToken()}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            throw new Error('Failed to delete a team on LH Games API.');
        }
    }

    async updateTeam(id: string, updateFields: any) {
        try {
            const res: Response = await nodeFetch(`${this.lhGamesApiUrl}/team/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${await this.stsService.getCurrentAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateFields)
            });
        } catch (e) {
            console.log(e);
            throw new Error('Failed to update a team on LH Games API.');
        }
    }
}
