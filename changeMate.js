ready();

async function ready() {

    const page = await getPage();
    createMeta( page );

}

function createMeta( page ) {

    const head = document.getElementsByTagName('head')[0];

    let title = page.querySelector( 'title' );
    title = title.innerText;

    let desc = page.getElementById( 'desc' );
    desc = desc.innerText.trim();

    const titleElem = document.createElement( 'title' );
    titleElem.innerText = title;

    const descMeta = document.createElement( 'meta' );
    descMeta.name = "description";
    descMeta.content = desc;

    const titleOgMeta = document.createElement( 'meta' );
    titleOgMeta.setAttribute( 'property', 'og:title' );
    titleOgMeta.setAttribute( 'content', title );

    const descOgMeta = document.createElement( 'meta' );
    descOgMeta.setAttribute( 'property', 'og:description' );
    descOgMeta.setAttribute( 'content', desc );

    head.querySelector( 'title' ).innerText = title;
    head.appendChild( descMeta );
    head.appendChild( titleOgMeta );
    head.appendChild( descOgMeta );

}

async function getPage() {

    const page = await fetch( './test.html' );

    if ( page.status !== 200 ) return;

    var parser = new DOMParser();
    var doc = parser.parseFromString( await page.text(), "text/html");

    return doc;

}