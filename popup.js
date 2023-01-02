class Notification {
    addNotification(settings) {
        this.type = settings.type;
        this.title = settings.title;
        this.message = settings.message;

        let icon;
        let divClass;
        let textColor;

        //Change the color and icon on your notification
        if (this.type == "success") {
            icon = "fas fa-check";
            divClass = "success";
            textColor = "#64963b";
        } else if (this.type == "error") {
            icon = "fas fa-times";
            divClass = "error";
            textColor = "#963b3b";
        }

        let notificationContent = `
      <div class="notification__icon">
        <i class="${icon}" style="color: ${textColor}"></i>
      </div>
      <div class="notification__exit-icon" onclick="notify.closeWindow(event)">
        <i class="fas fa-times-circle"></i>
      </div>
      <div class="notification__content">
        <h1 class="notification-title" style="color: ${textColor}">${this.title
            }</h1>
        <p class="notification-message">${this.message}</p>
      </div>`;

        let notifyArea = document.createElement("div");
        notifyArea.classList.add("notification-area");

        let notification = document.createElement("div");
        notification.classList.add("notification");
        notification.innerHTML = notificationContent;

        const area = document.querySelector(".notification-area");

        let firstTimer;
        let secondTimer;

        if (!area) {
            document.body.appendChild(notifyArea);
            notifyArea.appendChild(notification);

            if (!notification) {
                clearTimeout(firstTimer);
            } else if (notification) {
                firstTimer = setTimeout(() => {
                    notification.remove();
                }, 10000);
            }
        } else {
            area.appendChild(notification);

            if (!notification) {
                clearTimeout(secondTimer);
            } else {
                secondTimer = setTimeout(function () {
                    notification.remove();
                }, 10000);
            }
        }
    }

    closeWindow(e) {
        e.target.parentElement.parentElement.remove();
    }
}

let notify = new Notification();

/* ----- Specify type of notification, title and message ----- */


export default notify;