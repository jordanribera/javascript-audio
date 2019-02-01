Boom =
{

	'Context': null,
	'AudioBuffer': null,
	'SourceNode': null,
	'Analyser': null,
	'JavaScriptNode': null,

	'MaxValue': 0,

	'Visuals':
	{

		'CanvasContext': null,

		'CanvasWidth': 0,
		'CanvasHeight': 0,

		'BaseHue': 180,
		'BaseSaturation': 75,
		'BaseLightness': 50,

		'BaseOpacity': 0.5,

		'SpiralRotation': 0,

		'BaseLogScale': 1.25,

		'modifyColors': function()
		{

			pChange = 0.5; //TODO: make this a library value?
			nChange = 0 - pChange;

			NewHue = (Boom.Visuals.BaseHue + pChange) % 360;

			Boom.Visuals.BaseHue = NewHue;

		},

		'modifyRotation': function()
		{

			rChange = -0.05; //TODO: make this a library value?

			NewRotation = (Boom.Visuals.SpiralRotation + rChange) % 360;

			Boom.Visuals.SpiralRotation = NewRotation;

		},

		'modifyOpacity': function()
		{

			randOne = Math.random();
			randTwo = Math.random();
			oChange = (randOne - randTwo) / 10;

			NewOpacity = Boom.Visuals.BaseOpacity + oChange;

			if (NewOpacity < 0.1) NewOpacity = 0.1;
			if (NewOpacity > 0.5) NewOpacity = 0.5;

			Boom.Visuals.BaseOpacity = NewOpacity;

		},

		'modifyScaling': function()
		{

			randOne = Math.random();
			randTwo = Math.random();
			sChange = (randOne - randTwo) / 100;

			NewScale = Boom.Visuals.BaseLogScale + sChange;
			if(NewScale < 1.01) NewScale = 1.01;
			if(NewScale > 2) NewScale = 2; 

			Boom.Visuals.BaseLogScale = NewScale;

		},

		'polarToCartesian': function(angle, radius)
		{

			OutputX = radius * Math.cos(angle);
			OutputY = radius * Math.sin(angle);
			
			Output = {'X': OutputX, 'Y': OutputY};
			
			return Output;

		},

		'toRadians': function(DegAngle)
		{

			OutputAngle = DegAngle * (Math.PI / 180);
		
			OutputAngle += Boom.Visuals.SpiralRotation;

			OutputAngle = OutputAngle % 360;

			return OutputAngle;
		
		},

		'drawInsanityRadar': function(array)
		{

			StepSpacing = 1;

			StepSize = (Boom.Visuals.CanvasWidth - StepSpacing * 2) / array.length;

			StarRadius = ((Boom.Visuals.CanvasWidth / 2) / 5) * 4;
			CenterX = Boom.Visuals.CanvasWidth / 2;
			CenterY = Boom.Visuals.CanvasHeight / 2;

			AngleStep = (180) / array.length;

			Boom.Visuals.CanvasContext.lineWidth = '40';

			Boom.Visuals.CanvasContext.beginPath();

		    for ( var i = 0; i < (array.length); i++ )
		    {

		        var value = array[i];

		        Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, 0, StepSize - 1,value);
		        Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, Boom.Visuals.CanvasHeight - value,StepSize - 1,Boom.Visuals.CanvasHeight);

		        //draw polar points
				starCoords = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(i * AngleStep), StarRadius + value);

		        if(i == 0)
		        {

		    		Boom.Visuals.CanvasContext.moveTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		        }
		        else
		        {

		    		Boom.Visuals.CanvasContext.lineTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		        }
		        
		    }

		    for ( var i2 = 0; i2 < array.length; i2++ )
		    {

		    	specialIndex = array.length - i2;


		        var value = array[specialIndex];

				starCoords = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(specialIndex * AngleStep + 180), StarRadius + value);
				Boom.Visuals.CanvasContext.lineTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		    }

		    Boom.Visuals.CanvasContext.closePath();
		    Boom.Visuals.CanvasContext.stroke();


		    //path 2
			Boom.Visuals.CanvasContext.lineWidth = '20';

		    Boom.Visuals.CanvasContext.beginPath();

		    StarRadius = (StarRadius / 3) * 2;

		    for ( var i = 0; i < (array.length); i++ )
		    {

		        var value = ((array[i] * 2) / 3) * 2;

		        Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, 0, StepSize - 1, value);
		        Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, Boom.Visuals.CanvasHeight - value, StepSize - 1, Boom.Visuals.CanvasHeight);

		        //draw polar points
				starCoords = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(i * AngleStep), StarRadius + value / 2);

		        if(i == 0)
		        {

		    		Boom.Visuals.CanvasContext.moveTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		        }
		        else
		        {

		    		Boom.Visuals.CanvasContext.lineTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		        }
		        
		    }

		    for ( var i2 = 0; i2 < array.length; i2++ )
		    {

		    	specialIndex = array.length - i2;


		        var value = ((array[specialIndex] * 2) / 3) * 2;

				starCoords = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(specialIndex * AngleStep + 180), StarRadius + value / 2);
				Boom.Visuals.CanvasContext.lineTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		    }

		    Boom.Visuals.CanvasContext.closePath();
		    Boom.Visuals.CanvasContext.stroke();

		    //path 3
		    Boom.Visuals.CanvasContext.lineWidth = '10';


		    Boom.Visuals.CanvasContext.beginPath();

		    StarRadius = (StarRadius / 2);

		    for ( var i = 0; i < (array.length); i++ )
		    {

		        var value = array[i] * 2 / 3;

		        Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, 0, StepSize - 1, value);
		        Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, Boom.Visuals.CanvasHeight - value, StepSize - 1, Boom.Visuals.CanvasHeight);

		        //draw polar points
				starCoords = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(i * AngleStep), StarRadius + value / 2);

		        if(i == 0)
		        {

		    		Boom.Visuals.CanvasContext.moveTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		        }
		        else
		        {

		    		Boom.Visuals.CanvasContext.lineTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		        }
		        
		    }

		    for ( var i2 = 0; i2 < array.length; i2++ )
		    {

		    	specialIndex = array.length - i2;


		        var value = array[specialIndex] * 2 / 3;

				starCoords = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(specialIndex * AngleStep + 180), StarRadius + value / 2);
				Boom.Visuals.CanvasContext.lineTo(starCoords.X + CenterX, starCoords.Y + CenterY);

		    }

		    Boom.Visuals.CanvasContext.closePath();
		    Boom.Visuals.CanvasContext.stroke();

		},

		'drawThumpyCircle': function(array)
		{

			//get radius
			CircleRadius = Boom.Visuals.CanvasHeight;
			if(Boom.Visuals.CanvasWidth < Boom.Visuals.CanvasHeight) CircleRadius = Boom.Visuals.CanvasWidth;
			CircleRadius = (CircleRadius / 2) * 0.5;

			//get center
			CenterX = Boom.Visuals.CanvasWidth / 2;
			CenterY = Boom.Visuals.CanvasHeight / 2;

			//get volume average
			Count = 0;
			Total = 0;
			for (i = 0; i < array.length; i++)
			{

				Total += array[i];
				Count++;

			}

			VolumeAverage = Total / Count;

			//draw outer circle
		    Boom.Visuals.CanvasContext.lineWidth = '20';
			Boom.Visuals.CanvasContext.beginPath();

			for (angle = 0; angle < 360; angle++)
			{

				Coordinates = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(angle), CircleRadius + (VolumeAverage));

				if (angle == 0)
				{

					Boom.Visuals.CanvasContext.moveTo(Coordinates.X + CenterX, Coordinates.Y + CenterY);

				}
				else
				{

					Boom.Visuals.CanvasContext.lineTo(Coordinates.X + CenterX, Coordinates.Y + CenterY);

				}

			}

		    Boom.Visuals.CanvasContext.closePath();
		    Boom.Visuals.CanvasContext.stroke();

		    //draw inner circle
		    Boom.Visuals.CanvasContext.lineWidth = '20';
			Boom.Visuals.CanvasContext.beginPath();

			for (angle = 0; angle < 360; angle++)
			{

				Coordinates = Boom.Visuals.polarToCartesian(Boom.Visuals.toRadians(angle), CircleRadius / 2 - (VolumeAverage / 2));

				if (angle == 0)
				{

					Boom.Visuals.CanvasContext.moveTo(Coordinates.X + CenterX, Coordinates.Y + CenterY);

				}
				else
				{

					Boom.Visuals.CanvasContext.lineTo(Coordinates.X + CenterX, Coordinates.Y + CenterY);

				}

			}

		    Boom.Visuals.CanvasContext.closePath();
		    Boom.Visuals.CanvasContext.stroke();

		},

		'drawScaleTest': function(array)
		{

			ScalingPower = Boom.Visuals.BaseLogScale;
			PotStart = 1;
			CurrentPot = PotStart;
			RemainingDataPoints = array.length;
			CurrentLocation = 0;

			LoggedArray = new Array();

			TheEnd = false;

			while(!TheEnd)
			{

				var ThisPotTotal = 0;
				var ThisPotCount = 0;

				var ThisPotBeginning = Math.floor(CurrentLocation);
				var ThisPotEnding = Math.ceil(CurrentLocation + CurrentPot);
				if (ThisPotEnding > array.length)
				{

					ThisPotEnding = array.length;
					TheEnd = true;

				}

				for(PottingIndex = ThisPotBeginning; PottingIndex < ThisPotEnding; PottingIndex++)
				{

					ThisPotTotal += array[PottingIndex];
					ThisPotCount++;

				}

				LoggedArray[LoggedArray.length] = ThisPotTotal / ThisPotCount;

				CurrentLocation += CurrentPot;
				CurrentPot = CurrentPot * ScalingPower;

			}

			//draw linear at the top
			StepSpacing = 1;

			StepSize = (Boom.Visuals.CanvasWidth - StepSpacing * 2) / array.length;

			for ( var i = 0; i < (array.length); i++ )
		    {

		        var value = array[i];

		        if (value > Boom.MaxValue)
		        {

		        	Boom.MaxValue = value;
		        	console.log('new max value: ' + value);

		        }

		        Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, 0, StepSize - 1, value);

		    }

		    //draw log'd at the bottom
			StepSize = (Boom.Visuals.CanvasWidth - StepSpacing * 2) / LoggedArray.length;

		    for ( var i = 0; i < LoggedArray.length; i++ )
		    {

		    	var value = LoggedArray[i];

			    Boom.Visuals.CanvasContext.fillRect(i * StepSize + StepSpacing, Boom.Visuals.CanvasHeight - value, StepSize - 1, Boom.Visuals.CanvasHeight);

			}

			//console.log(LoggedArray.length);

		}

	},

	'Audio':
	{

		'setupAudioNodes': function()
		{

			// setup a javascript node
			Boom.JavaScriptNode = Boom.Context.createScriptProcessor(2048, 1, 1);
			// connect to destination, else it isn't called
			Boom.JavaScriptNode.connect(Boom.Context.destination);

			// when the javascript node is called
			// we use information from the analyzer node
			// to draw the volume
			Boom.JavaScriptNode.onaudioprocess = Boom.Audio.handleProcessing;

			// setup a analyzer
		    Boom.Analyser = Boom.Context.createAnalyser();
		    Boom.Analyser.smoothingTimeConstant = 0.5;
		    Boom.Analyser.fftSize = 2048;

		    // create a buffer source node
		    Boom.SourceNode = Boom.Context.createBufferSource();
		    Boom.SourceNode.connect(Boom.Analyser);
		    Boom.Analyser.connect(Boom.JavaScriptNode);

		    Boom.SourceNode.connect(Boom.Context.destination);

		},

		'handleProcessing': function()
		{

			// get the average for the first channel
		    var array =  new Uint8Array(Boom.Analyser.frequencyBinCount);
		    Boom.Analyser.getByteFrequencyData(array);

		    // clear the current state
		    //ctx.clearRect(0, 0, canvasW, canvasH);

		    //update visual parameters
		    Boom.Visuals.modifyColors();
		    Boom.Visuals.modifyRotation();
		    Boom.Visuals.modifyOpacity();

		    Boom.Visuals.modifyScaling();

		    Boom.Visuals.CanvasContext.fillStyle = 'hsla(' + Boom.Visuals.BaseHue + ', ' + Boom.Visuals.BaseSaturation + '%, ' + Boom.Visuals.BaseLightness + '%, ' + Boom.Visuals.BaseOpacity + ')';
		    Boom.Visuals.CanvasContext.fillRect(0, 0, Boom.Visuals.CanvasWidth, Boom.Visuals.CanvasHeight);

		    // set the fill style
		    //ctx.fillStyle = gradient;

		    FeatureOpacity = Boom.Visuals.BaseOpacity * 2;
		    if (FeatureOpacity > 1) FeatureOpacity = 1;

		    Boom.Visuals.CanvasContext.fillStyle = 'hsla(' + ((Boom.Visuals.BaseHue + 180) % 360) + ', ' + Boom.Visuals.BaseSaturation + '%, ' + Boom.Visuals.BaseLightness + '%, ' + FeatureOpacity + ')';
		    Boom.Visuals.CanvasContext.strokeStyle = 'hsla(' + ((Boom.Visuals.BaseHue + 180) % 360) + ', ' + Boom.Visuals.BaseSaturation + '%, ' + Boom.Visuals.BaseLightness + '%, ' + FeatureOpacity + ')';
		    Boom.Visuals.CanvasContext.lineWidth = '10';

		    Boom.Visuals.drawInsanityRadar(array);
		    //Boom.Visuals.drawThumpyCircle(array);
		    //Boom.Visuals.drawScaleTest(array);

		},

		'loadSong': function(url)
		{

			var request = new XMLHttpRequest();
		    request.open('GET', url, true);
		    request.responseType = 'arraybuffer';

		    // When loaded decode the data
		    request.onload = function()
		    {

		        // decode the data
		        Boom.Context.decodeAudioData(request.response, function(buffer)
		        {

		            // when the audio is decoded play the sound
		            Boom.Audio.playSong(buffer);

		        }, Boom.onError);

		    }

		    request.send();

		},

		'playSong': function(buffer)
		{

			Boom.SourceNode.buffer = buffer;
			Boom.SourceNode.start(0);

		}

	},

	'init': function()
	{

		if (! window.AudioContext)
		{

		    if (! window.webkitAudioContext)
		    {

		        alert('no audiocontext found');

		    }

		    window.AudioContext = window.webkitAudioContext;

		}

		Boom.Context = new AudioContext();

		TheCanvas = document.createElement('canvas');
		TheCanvas.setAttribute('id', 'TheCanvas');

		TheCanvas.width = document.body.clientWidth;
		TheCanvas.height = document.body.clientHeight;

		Boom.Visuals.CanvasWidth = TheCanvas.width;
		Boom.Visuals.CanvasHeight = TheCanvas.height;

		window.onresize = Boom.handleResize;

		Boom.Visuals.CanvasContext = TheCanvas.getContext('2d');

		document.body.appendChild(TheCanvas);

		Boom.Audio.setupAudioNodes();
		Boom.Audio.loadSong('03_Ingenue.mp3');

	},

	'handleResize': function()
	{

		TheCanvas = document.getElementById('TheCanvas');

		TheCanvas.width = document.body.clientWidth;
		TheCanvas.height = document.body.clientHeight;

		Boom.Visuals.CanvasWidth = TheCanvas.width;
		Boom.Visuals.CanvasHeight = TheCanvas.height;

	},

	'onError': function(e)
	{

		console.log(e);

	}

}