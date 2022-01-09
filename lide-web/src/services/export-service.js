import API from "./service.js";

function exporter(format,username) {
	return API.get(`/export/${username}?type=${format}`)
		.then( (response) => response.blob() )
		.then( (bytes) => {
			let link = document.createElement('a');
			link.setAttribute( 'href' , URL.createObjectURL( bytes ) );
			link.setAttribute( 'download' , `lide-${username}.${format}` );
			document.body.appendChild(link);
			link.click();
		})
}

export default {
	exporter,
};
