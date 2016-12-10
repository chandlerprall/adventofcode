var MinHeap = (function(){
	var MinHeap = function( array ) {
		this.heap = array === undefined ? [] : array.slice();
		
		if ( array !== undefined ) {
			this.heapify();
		}
	};
	MinHeap.prototype = {
		heapify: function() {
			var start = ~~( ( this.heap.length - 2 ) / 2 );
			while ( start >= 0 ) {
				this.siftUp( start, this.heap.length - 1 );
				start--;
			}
		},
		siftUp: function( start, end ) {
			var root = start;
			
			while ( root * 2 + 1 <= end ) {
				var child = root * 2 + 1;
				
				if ( child + 1 <= end && this.heap[child + 1] < this.heap[child] ) {
					child++;
				}
				
				if ( this.heap[child] < this.heap[root] ) {
					var tmp = this.heap[child];
					this.heap[child] = this.heap[root];
					this.heap[root] = tmp;
					root = child;
				} else {
					return;
				}
			}
		},
		push: function() {
			for ( var i = 0, args = arguments.length; i < args; i++ ) {
				this.heap.push( arguments[i] );
				this.heapify();
			}
		},
		peek: function() {
			return this.heap.length ? this.heap[0] : null;
		},
		pop: function() {
			value = this.heap.shift();
			this.heapify();
			return value;
		}
	};
	
	return MinHeap;
})();

module.exports = MinHeap;