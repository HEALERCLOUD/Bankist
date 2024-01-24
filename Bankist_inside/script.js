"use strict";

///////////////////////////////
//accounts
const account1 = {
  owner: "Luka Akhaladze",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Nana Ninidze ",
  movements: [100, 20, 10, 10, 160],
  interestRate: 1.2, // %
  pin: 7777,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "pt-PT", // de-DE
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

////////////////
// global variables
let currentAccount;
let sortedStatus = false;

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc) {
  containerMovements.innerHTML = "";
  const curIcon = acc.currency === "EUR" ? "€" : "$";

  acc[`${sortedStatus ? "sortedMovs" : "movements"}`].forEach(function (
    movement,
    i
  ) {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${
          movement > 0 ? movement : Math.abs(movement)
        }${curIcon}</div>
      </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUsernames(accounts);
// sum method
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(1)}${
    acc.currency === "EUR" ? "€" : "$"
  }`;
};

const calcDisplaySummary = function (acc) {
  const curIcon = acc.currency === "EUR" ? "€" : "$";
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}${curIcon}`;
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(1))}${curIcon}`;
  const intrest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${intrest.toFixed(1)}${curIcon}`;
};
const updateUi = function () {
  // clear all the inputs
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginPin.blur();
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
  inputTransferAmount.blur();
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
  calcDisplayBalance(currentAccount);
  displayMovements(currentAccount);
  calcDisplaySummary(currentAccount);
};

const logOutUser = function () {
  currentAccount = undefined;
  labelWelcome.textContent = "Please Login";
  containerApp.style.opacity = "0";
};
// event handlers
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = +inputLoginPin.value;
  currentAccount = accounts.find(
    (acc) => acc.username === username && acc.pin === pin
  );
  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    updateUi();
    containerApp.style.opacity = "100";
  }
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const user = inputTransferTo.value;
  const amount = +inputTransferAmount.value;
  const transferTo = accounts.find(
    (acc) => acc.username === user && currentAccount.username !== user
  );
  if (transferTo && amount > 0 && amount <= currentAccount.balance) {
    transferTo.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUi();
    alert(`Money has been succesfuly Transferet to ${transferTo.owner} ✅`);
  } else {
    alert("please input valid amount money to transfer ❌");
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loan = +inputLoanAmount.value;
  const premision = currentAccount.movements.some(
    (mov) => loan * 0.1 <= mov && loan > 0
  );
  inputLoanAmount.value = "";
  if (premision) {
    currentAccount.movements.push(loan);
    updateUi();
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  inputCloseUsername.value = inputClosePin.value = "";
  if (user === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      (acc) => acc.username === user && acc.pin === pin
    );
    accounts.splice(index, 1);
    console.log(accounts);
    logOutUser();
  }
});

btnSort.addEventListener("click", function () {
  currentAccount.sortedMovs = [...currentAccount.movements].sort(
    (a, b) => a - b
  );
  sortedStatus = !sortedStatus;
  updateUi();
});
