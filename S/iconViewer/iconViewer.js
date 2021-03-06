var IconSet, lastIndex;

function iconViewerTestKeysets(){
	let allKeys=symKeysBySet.nosymbols;
	let keys=allKeys.filter(x=>isdef(symbolDict[x].best100));
	let keys1=allKeys.filter(x=>isdef(symbolDict[x].best100) && isdef(symbolDict[x].bestE));
	let keys2=allKeys.filter(x=>isdef(symbolDict[x].best50));
	let keys3=allKeys.filter(x=>isdef(symbolDict[x].best25));
	console.log(keys3);
	iconViewer(keys3);

}

function iconViewer(keys) {
	onclick = show100;
	IconSet = isdef(keys) ? keys : symKeysBySet['nosymbols'];
	lastIndex = 0;
	Pictures = [];

	show100();

}
function downloadKeySet() {
	let keys = Pictures.filter(x => x.isSelected).map(x => x.info.key);
	downloadAsYaml(keys, 'keyset');
}
function show100() {
	let table = mBy('table');
	clearElement(table);

	mButton('download key set', downloadKeySet, table, { fz: 30 });

	let picLabelStyles = getHarmoniousStylesXX(100, 100, 10, 'arial', 'random', 'random', true);
	let picStyles = getHarmoniousStylesXX(100, 100, 10, 'arial', 'random', 'random', false);
	ensureSymByType();
	let keys = takeFromTo(IconSet, lastIndex, lastIndex + 100);//chooseRandom() ['keycap: 0', 'keycap: 1', 'keycap: #', 'keycap: *'];
	gridLabeled(keys, picLabelStyles);
}
function gridLabeled(list, picLabelStyles) {
	//cont,pic,text
	let dGrid = mDiv(mBy('table'));
	let elems = [];
	let isText = true;
	let isOmoji = false;
	let pictureSize = 200;
	let stylesForLabelButton = { rounding: 10, margin: pictureSize / 8 };

	for (const k of list) {
		let info = symbolDict[k];
		let label = (isdef(info.bestE) ? info.bestE : lastOfLanguage(k, 'E')) + ' ' + lastIndex;
		let el = maPicLabelButtonFitText(info, label,
			{ w: pictureSize, h: pictureSize, bgPic: 'random', shade: null, overlayColor: null },
			onClickIVPicture, dGrid, stylesForLabelButton, 'frameOnHover', isText, isOmoji);
		el.id = 'pic' + lastIndex;
		elems.push(el);
		Pictures.push({ div: el, info: info, label: label, isSelected: false });
		lastIndex += 1;
	}
	let gridStyles = { 'place-content': 'center', gap: 4, margin: 4, padding: 4, bg: 'silver', rounding: 5 };
	let size = layoutGrid(elems, dGrid, gridStyles, { rows: 10, isInline: true });
}

function onClickIVPicture(ev) {
	ev.cancelBubble = true;
	let id = evToClosestId(ev);
	console.log(id, Pictures, Pictures[10])
	let i = firstNumber(id);
	let pic = Pictures[i];
	toggleSelectionOfPicture(pic);

}

function toggleSelectionOfPicture(pic) {
	let ui = pic.div;
	//if (pic.isSelected){pic.isSelected=false;mRemoveClass(ui,)}
	pic.isSelected = !pic.isSelected;
	if (pic.isSelected) mClass(ui, 'framedPicture'); else mRemoveClass(ui, 'framedPicture');
}








