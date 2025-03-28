
export default class XMLParser{
    constructor(){
        this.parser = require('fast-xml-parser');
        this.j2xparser = require("fast-xml-parser").j2xParser;
        this.he = require('he');

        this.options = {
            attributeNamePrefix : "",
            attrNodeName: "attr", //default is 'false'
            textNodeName : "#text",
            ignoreAttributes : false,
            ignoreNameSpace : false,
            allowBooleanAttributes : false,
            parseNodeValue : true,
            parseAttributeValue : false,
            trimValues: true,
            cdataTagName: "__cdata", //default is 'false'
            cdataPositionChar: "\\c",
            parseTrueNumberOnly: false,
            arrayMode: false, //"strict"
            attrValueProcessor: (val, attrName) => this.he.decode(val, {isAttributeValue: true}),//default is a=>a
            tagValueProcessor : (val, tagName) => this.he.decode(val), //default is a=>a
            stopNodes: ["parse-me-as-string"]
        };
    }
    parseXML(xmlData){
        let jsonObj="";
        if( this.parser.validate(xmlData) === true) {
            jsonObj = this.parser.parse(xmlData,this.options);
        }else{
            try{
                jsonObj = this.parser.parse(xmlData,this.options, true);
              }catch(error){
                console.log(error.message);
              }
              return null;
        }
        return jsonObj;
    }
    parseJson(jsonData){

        var Parser = require("fast-xml-parser").j2xParser;
        //default options need not to set
        var defaultOptions = {
            attributeNamePrefix : "@_",
            attrNodeName: "@", //default is false
            textNodeName : "#text",
            ignoreAttributes : true,
            cdataTagName: "__cdata", //default is false
            cdataPositionChar: "\\c",
            format: false,
            indentBy: "  ",
            supressEmptyNode: false,
            tagValueProcessor: a=> this.he.encode(a, { useNamedReferences: true}),// default is a=>a
            // eslint-disable-next-line no-undef
            attrValueProcessor: a=> this.he.encode(a, {isAttributeValue: isAttribute, useNamedReferences: true})// default is a=>a
        };
        var parser = new Parser(defaultOptions);
        var xml = parser.parse(jsonData);

        return xml;
    }

}




