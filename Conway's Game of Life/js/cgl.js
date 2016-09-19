var tickSpeed, ticking;
var aliveCells, newGrid;
var btnToggle, btnReset, btnSpawn;
var sctSpeed, sctSpawn;
var spdArray;
var timer;
var rowCount, columnCount;

	$(document).ready(function(){

		initializeUI();
		$('.learningJQ-cell').on('click', cellClick);


		rowCount = $("#grid").grid("option", "rowCount");
		columnCount = $("#grid").grid("option", "columnCount");

		//$('.learningJQ-cell').each(initAddresses);

		spdArray = [1000, 500, 250, 100];

		resetGame();
	});

	function resetGame()
	{
		tickSpeed = spdArray[0];
		ticking = false;
		timer = setInterval(tick, tickSpeed);
	}

	function cellClick() {
		$(this).cell("toggleOn");
	}

	function tick()
	{
		if(ticking)
		{
			aliveCells = $("#grid").grid("cellsByCriterias", {on: true});
			newGrid = aliveCells.slice(0);

			//for each alive cell
			newGrid.each(function() {
				var neighbor = 0;
				var row = $(this).cell("option", "address").row;
				var col = $(this).cell("option", "address").column;

				//counting neighbors
				newGrid.each(function() {
					var nRow = $(this).cell("option", "address").row;
					var nCol = $(this).cell("option", "address").column;

					if(Math.abs(row - nRow) == 1 && Math.abs(col - nCol) == 1
					|| Math.abs(row - nRow) == 0 && Math.abs(col - nCol) == 1
					|| Math.abs(row - nRow) == 1 && Math.abs(col - nCol) == 0)
					{
						neighbor++;
					}
				});
				console.log($(this).cell("option", "address"));
				console.log(neighbor);
				console.log(" ");
			});
		}	
	}

	function tickToggle()
	{
		if(ticking)
		{
			ticking = false;
			btnToggle.button( "option", "label", "Start" );
			
		}else{
			ticking = true;
			btnToggle.button( "option", "label", "Stop" );
		}
	}

	function initializeUI()
	{
		btnToggle = $("#btnTickToggle");
		btnToggle.on('click', tickToggle);
		btnToggle.button();

		btnReset = $("#btnReset");
		btnReset.on('click', resetGame);
		btnReset.button();

		btnSpawn = $("#btnSpawn");
		//btnSpawn.on('click', spawnCells);
		btnSpawn.button();

		sctSpeed = $("#sctSpeed");
		sctSpeed.selectmenu({
		change:changeTickSpeed});

		sctSpawn = $("#sctSpawn");
		sctSpawn.selectmenu();
	}

	function changeTickSpeed()
	{
        var spdText = sctSpeed.val();

		switch(spdText)
		{
			case "min":
				tickSpeed = spdArray[0];
				break;
			case "slow":
				tickSpeed = spdArray[1];
				break;
			case "medium":
				tickSpeed = spdArray[2];
				break;
			case "fast":
				tickSpeed = spdArray[3];
				break;
			default:
				console.error("Speed is incorrect");
				break;
		}

		clearInterval(timer);
		timer = setInterval(tick, tickSpeed);
	}
	
	function spawnCells(pattern)
	{
		
	}

/**
 * OBSOLETE
 * @param i
 * @param element
 */
	function initAddresses(i, element)
	{
		var rowIndex = Math.floor(i / 10);
		var columnIndex = i % 10;
		$(element).cell("option", "address", {
			index: i, row: rowIndex, column: columnIndex
		});
		console.log($(element).cell("option", "address"));
	}