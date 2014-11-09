//wrapper around the noise generation library so we can specify amplitude,
//combine noises and project the noise to a range; 

    function lerp(a,b,epsilon)
    {
      return a * epsilon + b * (1 - epsilon);
    }
    function SimplexNoiseGenerator(frequency,minrange,maxrange,seed)
			{
				var _frequency = frequency;
				var _minrange = minrange;
				var _maxrange = maxrange;
				var _seed = seed;
        var noise = new SimplexNoise();
				
				this.frequency = function(value){
					if(value)_frequency = value;
					return _frequency;
				}
				this.minrange = function(value){
					if(value)_minrange = value;
					return _minrange;
				}
				this.maxrange = function(value){
					if(value)_maxrange = value;
					return _maxrange;
				}
				this.seed = function(value){
					if(value)_seed = value;
					return _seed;
				}
				

				this.noise = function(x,y){
					var noisy= noise.noise2D(x / _frequency, y / _frequency);
					//normalize
					noisy += 1;//change range from -1,1 to 0,2
					noisy /= 2;//change range from 0,2 to 0,1
					//convex combination
					noisy = (1 - noisy) * _minrange + noisy * _maxrange;
					return noisy;
				}
			}
			
			function CombinationGenerator(frequency,minrange,maxrange,generators)
			{
				var _frequency = frequency;
				var _minrange = minrange;
				var _maxrange = maxrange;
				var _generators = generators;
				
				this.frequency = function(value){
					if(value)_frequency = value;
					return _frequency;
				}
				this.minrange = function(value){
					if(value)_minrange = value;
					return _minrange;
				}
				this.maxrange = function(value){
					if(value)_maxrange = value;
					return _maxrange;
				}
				this.generators = function(value){
					if(value)_generators = value;
					return _generators;
				}
				
				this.noise = function(x,y){
					var fx = x / _frequency;
					var fy = y / _frequency;
					var noisy = _generators.reduce(function(previousValue,currentValue){
						return previousValue + currentValue.noise(fx,fy);
					},0);

          var totalMin = _generators.reduce(function(previousValue,currentValue){
            return previousValue + currentValue.minrange();
          },0);
          var totalMax = _generators.reduce(function(previousValue,currentValue){
            return previousValue + currentValue.maxrange();
          },0);
          noisy -= totalMin;
          noisy /= totalMax - totalMin;
          return minrange * (1 - noisy) + maxrange * noisy;
				}
      }