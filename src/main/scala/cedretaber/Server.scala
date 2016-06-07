package cedretaber

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.ws.{Message, TextMessage}
import akka.http.scaladsl.server.Directives
import akka.stream.Materializer
import akka.stream.scaladsl.{Flow, Source}

import scala.concurrent.{ExecutionContext, Future}
import scalaz.Scalaz.{get => _}

class Server(interface: String, port: Int)(
  implicit val system: ActorSystem,
  implicit val materializer: Materializer,
  implicit val ec: ExecutionContext
) extends Directives {

  val route =
    get {
      pathSingleSlash {
        getFromFile("public/index.html")
      } ~
      path("app.js") {
        getFromFile("public/js/bundle.js")
      } ~
      (for {
        roomName: String <- path("room" / Remaining) if !roomName.contains("/")
        userName: String <- parameter('name)
      } yield {
        handleWebSocketMessages(webSocketFlow(roomName, userName))
      }).apply(identity)
    }

  def webSocketFlow(roomName: String, userName: String): Flow[Message, Message, Any] =
    Flow[Message].mapConcat {
      case tm: TextMessage =>
        TextMessage(Source.single(s"$userName of $roomName said: ") ++ tm.textStream) :: Nil
    }

  val bindingFuture = Http().bindAndHandle(route, interface, port)

  def start(): Unit = {
  }

  def stop(): Future[Unit] = {
    bindingFuture.flatMap(_.unbind())
  }
}
