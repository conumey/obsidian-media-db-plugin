import {MediaTypeModel} from './MediaTypeModel';
import {mediaDbTag, debugLog} from '../utils/Utils';
import {MediaType} from '../utils/MediaType';

export class BookModel extends MediaTypeModel {
	type: string;
	subType: string;
	title: string;
	englishTitle: string;
	year: string;
	dataSource: string;
	url: string;
	id: string;

	authors: string[];
	genres: string[];
	onlineRating: number;
	image: string;

	released: boolean;
	releaseDate: string;

	userData: {
		played: boolean;
		personalRating: number;
	};


	constructor(obj: any = {}) {
		super();

		Object.assign(this, obj);

		this.type = this.getMediaType();
	}

	getTags(): string[] {
		return [mediaDbTag, 'book'];
	}

	getMediaType(): MediaType {
		return MediaType.Book;
	}

	getSummary(): string {
		return this.englishTitle + ' (' + this.year + ')';
	}

}
