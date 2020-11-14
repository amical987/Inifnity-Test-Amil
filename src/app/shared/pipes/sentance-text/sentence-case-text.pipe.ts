import { Pipe, PipeTransform } from "@angular/core";
import _ from 'lodash';

@Pipe({
    name: "sentenceCaseText"
})
export class SentenceCaseTextPipe implements PipeTransform {
    transform(text: string, args?: any): string {
        if (text) {
            return _.upperFirst(_.lowerCase(text));
        }

        return text;
    }
}
