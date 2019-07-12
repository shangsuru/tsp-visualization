class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.tail = null;
  }
}

LinkedList.prototype.insert = function(data) {
  let newNode = new Node(data);

  if (!this.tail) {
    this.head = newNode;
    this.tail = newNode;
    this.size++;
    return true;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return true;
  }
};

LinkedList.prototype.insertAtBeginning = function(data) {
  let newNode = new Node(data);

  newNode.next = this.head;
  this.head = newNode;
  this.size++;
  return true;
};

LinkedList.prototype.insertAt = function(index, data) {
  let newNode = new Node(data);

  if (index >= this.size) {
    return false;
  }
  let prevNode = this.head;
  let currentNode = this.head;
  while (index > 0) {
    prevNode = currentNode;
    currentNode = currentNode.next;
    index--;
  }
  if (prevNode == this.head) {
    newNode.next = this.head;
    this.head = newNode;
  } else {
    prevNode.next = newNode;
    newNode.next = currentNode;
  }
  if (this.tail.next != null) {
    this.tail = this.tail.next;
  }
  this.size++;
  return true;
};

LinkedList.prototype.get = function(index) {
  if (index >= this.size) {
    return false;
  }
  let res = this.head;
  while (index > 0) {
    res = res.next;
    index--;
  }
  return res.data;
};

LinkedList.prototype.getInt = function(index) {
  if (index >= this.size) {
    return false;
  }
  let res = this.head;
  while (index > 0) {
    res = res.next;
    index--;
  }
  return res;
};

LinkedList.prototype.delete = function(index) {
  if (index >= this.size) {
    return false;
  }
  let prev = null;
  let del = this.head;
  while (index > 0) {
    prev = del;
    del = del.next;
    index--;
  }
  if (prev == null) {
    this.head = del.next;
    if (del == this.tail) {
      this.tail = this.head;
    }
  } else {
    prev.next = del.next;
    if (del == this.tail) {
      this.tail = prev;
    }
  }
  this.size--;
  return del.data;
};

LinkedList.prototype.deleteAll = function(obj) {
  let i = 1;
  let preCurr = this.head;
  let curr = this.head.next;
  while (i < this.size - 2) {
    if (curr.data == obj) {
      preCurr.next = curr.next;
      this.size--;
    } else {
      preCurr = curr;
    }
    curr = curr.next;
    i++;
  }
  if (this.tail == obj) {
    this.tail = this.preTail;
    this.preTail = curr;
    this.size--;
  }
  if (this.tail == obj) {
    this.tail = this.preTail;
    this.preTail = preCurr;
    this.size--;
  }
  if (this.head.data == obj) {
    this.head = this.head.next;
    this.size--;
  }
  return true;
};

LinkedList.prototype.del = function(obj) {
  let i = 1;
  let preCurr = this.head;
  let curr = this.head.next;
  while (i < this.size - 2) {
    if (curr.data == obj) {
      preCurr.next = curr.next;
      break;
    }
    preCurr = curr;
    curr = curr.next;
    i++;
  }
  if (this.tail == obj) {
    this.tail = this.preTail;
    this.preTail = curr;
  }
  if (this.tail == obj) {
    this.tail = this.preTail;
    this.preTail = preCurr;
  }
  if (this.head.data == obj) {
    this.head = this.head.next;
  }
  return true;
};

LinkedList.prototype.pop = function() {
  return this.delete(0);
};

LinkedList.prototype.slice = function(index) {
  if (index >= this.size || index < 0) {
    return false;
  } else {
    let ll = new LinkedList();
    let curr = this.head;
    let i = 0;
    while (index > 0) {
      curr = curr.next;
      index--;
      i++;
    }

    while (i < this.size) {
      ll.insert(curr.data);
      curr = curr.next;
      i++;
    }
    return ll;
  }
};

LinkedList.prototype.slice = function(start, end) {
  if (
    start >= this.size ||
    start < 0 ||
    end >= this.size ||
    end < 0 ||
    end < start
  ) {
    return false;
  } else {
    let ll = new LinkedList();
    let curr = this.head;
    let i = 0;
    while (start > 0) {
      curr = curr.next;
      start--;
      i++;
    }

    while (i < end) {
      ll.insert(curr.data);
      curr = curr.next;
      i++;
    }
    return ll;
  }
};

LinkedList.prototype.pollLast = function() {
  return this.delete(this.size - 1);
};

LinkedList.prototype.getLast = function() {
  return this.tail.data;
};

LinkedList.prototype.getPreLast = function() {
  return this.get(this.size - 2);
};

LinkedList.prototype.copy = function() {
  let ll = new LinkedList();
  let curr = this.head;
  while (curr != null) {
    ll.insert(curr.data);
    curr = curr.next;
  }
  return ll;
};

LinkedList.prototype.toString = function() {
  let string = "[";

  if (this.head != null) {
    if (isDict(this.head.data)) {
      string += dictToString(this.head.data);
    } else {
      string += this.head.data;
    }

    let curr = this.head.next;
    while (curr != null) {
      string += ", ";
      if (isDict(curr.data)) {
        string += dictToString(curr.data);
      } else {
        string += curr.data;
      }
      curr = curr.next;
    }
  }

  string += "]";
  return string;
};
