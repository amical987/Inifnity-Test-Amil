import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "codeName"
})

// String expression without special characters
// https://www.c-sharpcorner.com/blogs/replace-special-characters-from-string-using-regex1
export class CodeNamePipe implements PipeTransform {
    transform(text: string): string {
        if (text) {
            text = text.replace(/[^0-9a-zA-Z]+/g, ' ')
            return text.split(' ').map(word => {
                return word.length > 0 ? word[0].toUpperCase() + word.substr(1) : word;
            }).join('');
        }
        return text;
    }
}
