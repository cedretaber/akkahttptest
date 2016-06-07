package cedretaber

import akka.actor.ActorSystem
import akka.stream.{ActorMaterializer, Materializer}

import scala.concurrent.ExecutionContext
import scala.io.StdIn

object Main {
  def main(args: Array[String]): Unit = {

    implicit val system: ActorSystem = ActorSystem()
    implicit val materializer: Materializer = ActorMaterializer()
    implicit val ec: ExecutionContext = system.dispatcher

    val server = new Server("localhost", 9080)
    server.start()

    println(s"Server online at http://localhost:9080/\nPress RETURN to stop...")
    StdIn.readLine()

    server.stop().onComplete { _ => system.terminate() }
  }
}
