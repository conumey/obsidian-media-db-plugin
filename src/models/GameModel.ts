import {MediaTypeModel} from './MediaTypeModel';
import {mediaDbTag} from '../utils/Utils';
import {MediaType} from '../utils/MediaType';


export class GameModel extends MediaTypeModel {
	type: string;
	subType: string;
	title: string;
	englishTitle: string;
	year: string;
	dataSource: string;
	url: string;
	id: string;

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
		return [mediaDbTag, 'game'];
	}

	getMediaType(): MediaType {
		return MediaType.Game;
	}

	getSummary(): string {
		return this.englishTitle + ' (' + this.year + ')';
	}

}
