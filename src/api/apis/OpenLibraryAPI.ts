import {APIModel} from '../APIModel';
import {MediaTypeModel} from '../../models/MediaTypeModel';
import MediaDbPlugin from '../../main';
import {requestUrl} from 'obsidian';
import {contactEmail, debugLog, mediaDbVersion, pluginName} from '../../utils/Utils';
import { BookModel } from '../../models/BookModel';

export class OpenLibraryAPI extends APIModel {
	plugin: MediaDbPlugin;

	constructor(plugin: MediaDbPlugin) {
		super();

		this.plugin = plugin;
		this.apiName = 'OpenLibrary API';
		this.apiDescription = 'Free API for books.';
		this.apiUrl = 'https://openlibrary.org/developers/api/';
		this.types = ['books'];
	}

	async searchByTitle(title: string): Promise<MediaTypeModel[]> {
		console.log(`MDB | api "${this.apiName}" queried by Title`);

		const searchUrl = `http://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;

		const fetchData = await requestUrl({
			url: searchUrl,
			headers: {
				'User-Agent': `${pluginName}/${mediaDbVersion} (${contactEmail})`,
			},
		});

		debugLog(fetchData);

		if (fetchData.status !== 200) {
			throw Error(`MDB | Received status code ${fetchData.status} from an API.`);
		}

		const data = await fetchData.json;
		debugLog(data);
		let ret: MediaTypeModel[] = [];

		for (const result of data['docs']) {
			ret.push(new BookModel({
				type: 'book',
				title: result.title,
				englishTitle: result.title,
				year: result.first_publish_year,
				dataSource: this.apiName,
				url: 'https://openlibrary.org' + result.key,
				id: result.key,

				authors: result['author_name'],
				subType: result['type'],
			} as BookModel));
		}

		return ret;
	}

	async getById(id: string): Promise<MediaTypeModel> {
		console.log(`MDB | api "${this.apiName}" queried by ID`);

		var id = encodeURIComponent(id);
		const searchUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${id}&format=json&jscmd=data`;
		const fetchData = await requestUrl({
			url: searchUrl,
			headers: {
				'User-Agent': `${pluginName}/${mediaDbVersion} (${contactEmail})`,
			},
		});

		if (fetchData.status !== 200) {
			throw Error(`MDB | Received status code ${fetchData.status} from an API.`);
		}

		const data = await fetchData.json;
		debugLog(data);
		const result = data[0];

		const model = new BookModel({
			type: 'book',
				title: result.title,
				englishTitle: result.title,
				year: result.year,
				dataSource: this.apiName,
				url: 'https://openlibrary.org' + result.key,
				id: result.key,

				authors: result['author_name'].map((a: any) => a.name),
				subType: result['type'],
		});

		return model;
	}
}
