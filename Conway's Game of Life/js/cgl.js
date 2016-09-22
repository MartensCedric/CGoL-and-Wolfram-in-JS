var tickSpeed, ticking;
var aliveCells;
var btnToggle, btnReset, btnSpawn;
var sctSpeed, sctSpawn, sctGameType;
var spdArray;
var timer;
var rowCount, columnCount;
var creatures;
var txtRule;
var previousArray;

	$(document).ready(function(){

		initializeUI();
		$('.ljq-grid').grid('option', 'click',  function( event, info) {
			info.cellElement.cell("toggleOn");
		});


		rowCount = $("#grid").grid("option", "rowCount");
		columnCount = $("#grid").grid("option", "columnCount");


		spdArray = [1000, 500, 250, 100, 25, 5];

		//Abandoned feature
		//initCreatureDictionary();

		previousArray = [];

		timer = setInterval(tick, spdArray[0]);
		resetGame();
	});

	function resetGame()
	{
		$("#grid").grid("cells").cell("toggleOn", false);
		setTick(false);
	}

	function tick()
	{
		if(ticking)
		{
			if(sctGameType.val() == "cgl")
			{
				tickCGoL();
			}else if(sctGameType.val = "wolfram")
			{
				if(txtRuleToBinaryArray() !== undefined)
				{
					tickWolfram();
				}

			}
		}	
	}

	function tickCGoL()
	{
		aliveCells = $("#grid").grid("cellsByOn", true);
		deadCells = $("#grid").grid("cellsByOn", false);

		//for each alive cell
		aliveCells.each(function() {
			var neighbor = 0;
			var row = $(this).cell("option", "address").row;
			var col = $(this).cell("option", "address").column;

			//counting neighbors
			aliveCells.each(function() {
				var nRow = $(this).cell("option", "address").row;
				var nCol = $(this).cell("option", "address").column;

				if(Math.abs(row - nRow) == 1 && Math.abs(col - nCol) == 1
					|| Math.abs(row - nRow) == 0 && Math.abs(col - nCol) == 1
					|| Math.abs(row - nRow) == 1 && Math.abs(col - nCol) == 0)
				{
					neighbor++;
				}
			});
			//Kill cell
			if(neighbor < 2 || neighbor > 3)
			{
				$(this).cell("toggleOn");
			}
		});

		//for each dead cells

		deadCells.each(function() {
			var neighbor = 0;
			var row = $(this).cell("option", "address").row;
			var col = $(this).cell("option", "address").column;

			//counting neighbors
			aliveCells.each(function() {
				var nRow = $(this).cell("option", "address").row;
				var nCol = $(this).cell("option", "address").column;

				if(Math.abs(row - nRow) == 1 && Math.abs(col - nCol) == 1
					|| Math.abs(row - nRow) == 0 && Math.abs(col - nCol) == 1
					|| Math.abs(row - nRow) == 1 && Math.abs(col - nCol) == 0)
				{
					neighbor++;
				}
			});

			//Spawn cell
			if(neighbor == 3)
			{
				$(this).cell("toggleOn");
			}
		});
	}

	function tickToggle()
	{
		setTick(!ticking);
	}

	function setTick(willTick)
	{
		if(willTick)
		{
			btnToggle.button( "option", "label", "Stop" );
			ticking = true;
		}else{
			btnToggle.button( "option", "label", "Start" );
			ticking = false;
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

		/*btnSpawn = $("#btnSpawn");
		btnSpawn.on('click', spawnCells);
		btnSpawn.button();*/

		sctSpeed = $("#sctSpeed");
		sctSpeed.selectmenu({
		change:changeTickSpeed});

		/*sctSpawn = $("#sctSpawn");
		sctSpawn.selectmenu();*/

		sctGameType = $("#sctGameType");
		sctGameType.selectmenu();

		txtRule = $("#txtRule");
		//txtRule.tooltip();
		//txtRule.tooltip("option", "content", "Test!");
		//txtRule.tooltip("open")

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
			case "vfast":
				tickSpeed = spdArray[4];
				break;
			case "max":
				tickSpeed = spdArray[5];
				break;
			default:
				console.error("Speed is incorrect");
				break;
		}

		clearInterval(timer);
		timer = setInterval(tick, tickSpeed);
	}
	
	function spawnCells()
	{
		console.log(creatures[sctSpawn.val()]);
	}
	
	function initCreatureDictionary()
	{
		//This is my custom Hashmap, I couldn't manage to read files with AJAX so I'm doing this
		creatures = {};
		creatures.glider = "0,1,0|0,0,1|1,1,1";
		creatures.star = "0,1,0|1,1,1";
		creatures.clown = "1,0,1|1,0,1|1,1,1";
		creatures.circle = "0,0,1|1,1,0|0,1,0";
	}

	function intToBinary(number)
	{
		if(number <= 255 && number >= 0)
		{
			number = (number).toString(2);
			while(number.length != 8)
			{
				number = "0" + number;
			}
		}
		return number;
	}

	function binaryIntToArray(number)
	{

		//Only for ints below 256 and 0 or more
		if(number.toString().length == 8)
		{
			var intArray = [];
			for(i = 0; i < number.toString().length; i++)
			{
				intArray[i] = number.toString().charAt(i);
			}
			return intArray;
		}
	}

	function txtRuleToBinaryArray()
	{
		return binaryIntToArray(intToBinary(parseInt(txtRule.val())));
	}

	function tickWolfram(patternArray)
	{
		if(previousArray.length != 0)
		{
			
		}

	}
		

