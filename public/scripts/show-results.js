import { get as getRequest } from 'requester';

export function loadTemplate(templateName, data, selector) {
    let template;
    let compiledTemplate;
    let $element;
    getRequest(`/public/templates/${templateName}.handlebars`)
        .then(value => {
            template = value;
            compiledTemplate = Handlebars.compile(template);
            $element = $(selector);
            $element.html(compiledTemplate(data));
        });
}

export function showResults(obj, year) {
    const yearParam = "year" + year;
    loadTemplate(yearParam, obj, "#resultTable tbody");
}