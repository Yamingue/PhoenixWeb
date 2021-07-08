<?php
namespace App\Security;

use KnpU\OAuth2ClientBundle\Security\Authenticator\SocialAuthenticator;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use League\OAuth2\Client\Token\AccessToken;
use KnpU\OAuth2ClientBundle\Client\Provider\GithubClient;
use App\Repository\UserRepository;
use Symfony\Component\HttpClient\HttpClient;
use League\OAuth2\Client\Provider\GithubResourceOwner;

class GithubAuthenticator extends SocialAuthenticator
{
    private $router;
    private $clientRegistry;
    private $userRepo;
    public function __construct(RouterInterface $router, ClientRegistry $clientRegistry, UserRepository $userRepo){
        $this->router = $router;
        $this->clientRegistry = $clientRegistry;
        $this->userRepo = $userRepo;

    }
	/**
	 * Does the authenticator support the given Request?
	 * If this returns false, the authenticator will be skipped.
	 *
	 * @param \Symfony\Component\HttpFoundation\Request $request 
	 *
	 * @return bool
	 */
	function supports(Request $request) {
        return $request->attributes->get('_route') == 'oauth_check' && $request->get('service') == 'github' ;

	}
	
	/**
	 * Get the authentication credentials from the request and return them
	 * as any type (e.g. an associate array).
	 * Whatever value you return here will be passed to getUser() and checkCredentials()
	 * 
	 * For example, for a form login, you might:
	 * 
	 * return [
	 * 'username' => $request->request->get('_username'),
	 * 'password' => $request->request->get('_password'),
	 * ];
	 * 
	 * Or for an API token that's on a header, you might use:
	 * 
	 * return ['api_key' => $request->headers->get('X-API-TOKEN')];
	 */
	function getCredentials(Request $request) {

    //dd($this->clientRegistry->getClient('github'));
        return $this->fetchAccessToken($this->getClient());
	}
	
	/**
	 * Return a UserInterface object based on the credentials.
	 * The *credentials* are the return value from getCredentials()
	 * 
	 * You may throw an AuthenticationException if you wish. If you return
	 * null, then a UserNotFoundException is thrown for you.
	 *
	 * @param AccessToken $credentials 
	 * @param UserProviderInterface $userProvider 
	 */
	function getUser($credentials, UserProviderInterface $userProvider) {
    $user_git = $this->getClient()->fetchUserFromToken($credentials);
    $respose = HttpClient::create()->request(
        'GET',
        'https://api.github.com/user/emails',
        [
            'headers'=>[
                'authorization' =>'token '.$credentials->getToken()
            ]
        ]
    );
    $data = $user_git->toArray();
    $data['email'] = (json_decode($respose->getContent(),true))[0]['email'];
    $user_git = new GithubResourceOwner($data);
    return $this->userRepo->findGithubClientFromOauth($user_git);
	}
	
	/**
	 * Called when authentication executed, but failed (e.g. wrong username password).
	 * This should return the Response sent back to the user, like a
	 * RedirectResponse to the login page or a 401 response.
	 * 
	 * If you return null, the request will continue, but the user will
	 * not be authenticated. This is probably not what you want to do.
	 */
	function onAuthenticationFailure(Request $request, AuthenticationException $exception) {
	}
	
	/**
	 * Called when authentication executed and was successful!
	 * This should return the Response sent back to the user, like a
	 * RedirectResponse to the last page they visited.
	 * 
	 * If you return null, the current request will continue, and the user
	 * will be authenticated. This makes sense, for example, with an API.
	 *
	 */
	function onAuthenticationSuccess(Request $request,TokenInterface $token, string $providerKey) {
        return new RedirectResponse('/');
	}
	
	/**
	 * Returns a response that directs the user to authenticate.
	 * This is called when an anonymous request accesses a resource that
	 * requires authentication. The job of this method is to return some
	 * response that "helps" the user start into the authentication process.
	 * 
	 * Examples:
	 * 
	 * - For a form login, you might redirect to the login page
	 * 
	 * return new RedirectResponse('/login');
	 * 
	 * - For an API token authentication system, you return a 401 response
	 * 
	 * return new Response('Auth header required', 401);
	 */
	function start(Request $request, AuthenticationException $authException = null) {
        return new RedirectResponse($this->router->generate('app_login'));
	}

    public function getClient(): GithubClient
    {
        return $this->clientRegistry->getClient('github');
    }
}
