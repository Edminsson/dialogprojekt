using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Dialog.Startup))]
namespace Dialog
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
