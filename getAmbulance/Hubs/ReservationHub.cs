using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

using System.Data;
using System.Collections.Concurrent;
using System.Threading.Tasks;
namespace getAmbulance.Hubs
{
    [Authorize]
    [HubName("Reservation")]
    public class ReservationHub : Hub
    {
        private static ConcurrentDictionary<string, string> _mapping = new ConcurrentDictionary<string, string>();

        public async override Task OnConnected()
        {
            string WL_ID=Context.QueryString.Get("WL_ID");
            _mapping.TryAdd(Context.ConnectionId, WL_ID);
            var connectionId = _mapping.FirstOrDefault(x => x.Value == WL_ID).Key;
            await AddToRoom(WL_ID);
            Clients.Client(connectionId).newConnection(WL_ID);
           // Clients.All.newConnection(Context.ConnectionId);
            await base.OnConnected();
        }
        public async Task AddToRoom(string roomName)
        {
            await Groups.Add(Context.ConnectionId, roomName);
           // Clients.Group(roomName).addChatMessage(Context.User.Identity.Name + " joined.");
        }
        public async Task RemoveFromRoom(string roomName)
        {
            await Groups.Remove(Context.ConnectionId, roomName);
        }
        public void Lock(int id)
        {
            Clients.Others.lockEmployee(id);
        //    _mapping[Context.ConnectionId].Add(id);
        }

        public void Unlock(int id)
        {
            UnlockHelper(id);
            _mapping[Context.ConnectionId].Remove(id);
        }

        private void UnlockHelper(int id)
        {
          
            Clients.Others.unlockEmployee(id);
        }

        public async override Task OnDisconnected(bool stopCalled)
        {
            if (_mapping.Count > 0) {
            foreach (var id in _mapping[Context.ConnectionId])
            {
                UnlockHelper(id);
            }
            var list = new List<int>();
                //   _mapping.TryRemove(Context.ConnectionId, out list);
                string WL_ID = Context.QueryString.Get("WL_ID");
                await RemoveFromRoom(WL_ID);
               // Clients.All.removeConnection(Context.ConnectionId);
            }
            await base.OnDisconnected(true);

        }
    }
}