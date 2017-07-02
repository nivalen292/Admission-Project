import { get as getRequest } from 'requester';

export function loadTemplate(templateName, data, selector) {
    let template;
    let compiledTemplate;
    let $element;
    getRequest(`/views/${templateName}.handlebars`)
        .then(value => {
            template = value;
            compiledTemplate = Handlebars.compile(template);
            $element = $(selector);
            $element.html($element.html() + compiledTemplate(data));
        });
}

export function showResults(obj, key) {
    loadTemplate("year-template", obj, "#resultTable tbody");
}